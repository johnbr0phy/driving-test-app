import { NextRequest, NextResponse } from "next/server";
import { SITEMAP_SEGMENTS, buildSegment } from "@/lib/sitemaps";
import { SITE_URL } from "@/lib/siteUrl";
import { INDEXNOW_MAX_URLS, recentUrls, type DatedUrl } from "@/lib/indexNow";

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
  if (!secret) return true;
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
