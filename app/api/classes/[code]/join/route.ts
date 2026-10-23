import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { cleanName, isClassCode, isMemberId, normalizeClassCode } from "@/lib/classes";
import { joinClassMember } from "@/lib/server/classMembers";

// A student joins with a name and the random memberId their browser made.
// Joining again from the same browser renames them.
export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!isClassCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Enter your name" }, { status: 400 });

  const result = await joinClassMember(getAdminDb(), code, body.memberId, name);
  if (result.status !== 200) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
