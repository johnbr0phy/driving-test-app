import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { readLayoutUsage, runLayoutChunk } from "@/lib/server/layoutUsage";

// "Dashboard layout" card on the /admin Growth tab: interleaved (Set N, Test N)
// against sets-first exam dashboards. Scanning every account takes longer than
// one serverless call allows, so the card drives POST in chunks
// (lib/server/layoutUsage.ts) and GET reads the saved result.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    return NextResponse.json(await readLayoutUsage(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[admin/layout-usage GET]", error);
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }, { status: 500 });
  }
}

/** One chunk of the scan. `?fresh=1` starts over instead of resuming. */
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const fresh = request.nextUrl.searchParams.get("fresh") === "1";
    return NextResponse.json(await runLayoutChunk(fresh));
  } catch (error) {
    console.error("[admin/layout-usage POST]", error);
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }, { status: 500 });
  }
}
