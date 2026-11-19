import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { buildQuestionHealth } from "@/lib/server/questionHealth";

// The /admin Questions tab: a read-only log of what the question automation
// did (lib/server/questionHealth.ts). There is nothing to act on here: the
// audit, source triage and exam upkeep settle everything themselves.

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json(await buildQuestionHealth(), { headers: { "Cache-Control": "no-store" } });
}
