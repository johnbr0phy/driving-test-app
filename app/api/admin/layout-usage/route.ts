import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { cachedAdminPayload, cachedJson, wantsRefresh } from "@/lib/server/adminCache";
import { buildLayoutUsage } from "@/lib/server/layoutUsage";

// "Dashboard layout" card on the /admin Growth tab: interleaved (Set N, Test N)
// against sets-first exam dashboards. Scans every account, so cached an hour.
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: "layout-usage",
      ttlMs: 60 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: buildLayoutUsage,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error("[admin/layout-usage]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 },
    );
  }
}
