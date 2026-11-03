import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/server/adminAuth";
import { buildQuestionHealth } from "@/lib/server/questionHealth";

// The /admin Questions tab: GET the payload (lib/server/questionHealth.ts),
// PATCH to close reports and audit findings or accept a changed source page.

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json(await buildQuestionHealth(), { headers: { "Cache-Control": "no-store" } });
}

const STATUSES = new Set(["fixed", "dismissed", "open"]);

export async function PATCH(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const db = getAdminDb();
  const now = new Date().toISOString();
  const ids: string[] = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === "string").slice(0, 200) : [];

  if (body.kind === "report" || body.kind === "finding") {
    if (!STATUSES.has(body.status) || !ids.length) return NextResponse.json({ error: "invalid" }, { status: 400 });
    const col = body.kind === "report" ? "questionReports" : "questionAuditFindings";
    const batch = db.batch();
    for (const id of ids) batch.update(db.collection(col).doc(id), { status: body.status, closedAt: now });
    await batch.commit();
    return NextResponse.json({ ok: true, updated: ids.length });
  }

  if (body.kind === "source") {
    if (!ids.length) return NextResponse.json({ error: "invalid" }, { status: 400 });
    for (const id of ids) {
      const ref = db.collection("sourceWatch").doc(id);
      const snap = await ref.get();
      const latest = snap.data()?.latest;
      if (!latest) continue;
      // Reviewed: today's page becomes the baseline the next check compares to.
      await ref.update({ baseline: latest, baselineAt: now, changed: false, ratio: 0, reviewedAt: now });
    }
    return NextResponse.json({ ok: true, updated: ids.length });
  }

  return NextResponse.json({ error: "invalid" }, { status: 400 });
}
