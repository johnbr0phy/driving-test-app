import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { cachedAdminPayload, cachedJson, wantsRefresh } from "@/lib/server/adminCache";
import { buildLayoutRetention } from "@/lib/server/layoutRetention";

// "Retention by layout" card on the /admin Growth tab (lib/server/layoutRetention.ts).
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: "layout-retention",
      ttlMs: 5 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: buildLayoutRetention,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error("[admin/layout-retention]", error);
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }, { status: 500 });
  }
}
