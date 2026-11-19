import { NextRequest, NextResponse } from "next/server";
import { SITEMAP_SEGMENTS, buildSegment } from "@/lib/sitemaps";
import { SITE_URL } from "@/lib/siteUrl";
import { INDEXNOW_MAX_URLS, recentUrls, type DatedUrl } from "@/lib/indexNow";
import { getAdminDb } from "@/lib/firebase-admin";
import { recordIndexNowRun } from "@/lib/server/indexNowLog";

// IndexNow submission endpoint. POSTs the canonical URL list to
// api.indexnow.org so Bing (and downstream consumers like ChatGPT search
// and Perplexity) re-crawl the site within minutes of a deploy instead
// of waiting on Bing's normal crawl cadence.
//
// Trigger via Vercel Cron (see vercel.json) or manually:
//   curl -X POST https://www.tigertest.io/api/indexnow/ping \
//     -H "Authorization: Bearer $CRON_SECRET"
//
// ?days=N sends only URLs whose sitemap lastmod is within the last N days
// (the nightly cron uses this). Without it every sitemap URL is sent.
// After each production deploy, .github/workflows/indexnow.yml does the same
// from the live sitemap, so a launch reaches Bing within minutes.

function verifyAuth(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret means no auth locally only: in production an unset CRON_SECRET
  // must not open the route to everyone.
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

// The same URLs as the sitemaps, so a page added there (the vi/ko/zh DMV
// pages, translated exam landings, /teach) is submitted here too.
async function buildUrlList(days: number | null): Promise<string[]> {
  const entries: DatedUrl[] = [];
  for (const segment of SITEMAP_SEGMENTS) {
    for (const entry of await buildSegment(segment)) entries.push(entry);
  }
  if (days !== null) return recentUrls(entries, days);
  return Array.from(new Set(entries.map((e) => e.url)));
}

function daysParam(req: NextRequest): number | null {
  const raw = req.nextUrl.searchParams.get("days");
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

// Kept for the /admin New tests tab (lib/indexNowSent.mjs). A failed write
// never fails the submission, which has already gone out.
async function logRun(r: { urls: string[]; status: number; ok: boolean; days: number | null }) {
  try {
    await recordIndexNowRun(getAdminDb(), { source: r.days === null ? "full" : "nightly", ...r });
  } catch (e) {
    console.error("[indexnow] could not record the run", e);
  }
}

async function submit(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY env var not set" },
      { status: 500 }
    );
  }

  const host = new URL(SITE_URL).host;
  const days = daysParam(req);
  const urls = (await buildUrlList(days)).slice(0, INDEXNOW_MAX_URLS);
  if (urls.length === 0) {
    console.log(`[indexnow] no pages changed in ${days} days`);
    await logRun({ urls, status: 0, ok: true, days });
    return NextResponse.json({ submitted: 0, days, note: "No URLs changed in that window" });
  }

  const payload = {
    host,
    key,
    // At the host root, so every URL on the host is in the key's scope
    // (next.config.ts rewrites /<key>.txt to /api/indexnow/key).
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`[indexnow] sent ${urls.length} pages, IndexNow answered ${res.status}`);
  await logRun({ urls, status: res.status, ok: res.ok, days });

  return NextResponse.json(
    {
      submitted: urls.length,
      days,
      indexNowStatus: res.status,
      indexNowOk: res.ok,
    },
    { status: res.ok ? 200 : 502 }
  );
}

export async function POST(req: NextRequest) {
  return submit(req);
}

// GET is also accepted so Vercel Cron (which sends GET) can trigger this.
export async function GET(req: NextRequest) {
  return submit(req);
}
