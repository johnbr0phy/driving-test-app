import { NextRequest, NextResponse } from "next/server";
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
  const snap = await getAdminDb().collection("classes").doc(code).collection("members").get();
  return NextResponse.json(buildClassReport(code, owner.classData, snap.docs.map((d) => d.data() as MemberDoc)));
}
