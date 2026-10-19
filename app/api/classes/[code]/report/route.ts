import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireClassOwner } from "@/lib/server/classAuth";
import { buildClassReport, type MemberDoc } from "@/lib/server/classReport";
import { isClassCode, normalizeClassCode } from "@/lib/classes";

// The teacher's view of a class (lib/server/classReport.ts). Teacher or site admin only.
export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  if (!isClassCode(code)) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const owner = await requireClassOwner(request, code);
  if (!owner.ok) return owner.response;
  const classRef = getAdminDb().collection("classes").doc(code);
  // How often the teacher comes back to look, for /admin/teach. A site admin's look doesn't count.
  if (!owner.admin) {
    await classRef.update({ teacherViews: FieldValue.increment(1), teacherLastViewedAt: new Date().toISOString() }).catch(() => {});
  }
  const snap = await classRef.collection("members").get();
  return NextResponse.json(buildClassReport(code, owner.classData, snap.docs.map((d) => d.data() as MemberDoc)));
}
