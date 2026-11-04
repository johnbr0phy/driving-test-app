import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/server/adminAuth";
import { buildQuestionHealth } from "@/lib/server/questionHealth";

// The /admin Questions tab: GET the payload (lib/server/questionHealth.ts),
// PATCH to mark reports fixed or dismissed.

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
  const ids: string[] = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === "string").slice(0, 200) : [];
  if (body.kind !== "report" || !STATUSES.has(body.status) || !ids.length) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const db = getAdminDb();
  const now = new Date().toISOString();
  const batch = db.batch();
  for (const id of ids) batch.update(db.collection("questionReports").doc(id), { status: body.status, closedAt: now });
  await batch.commit();
  return NextResponse.json({ ok: true, updated: ids.length });
}
