import { NextRequest, NextResponse } from "next/server";
import { SITEMAP_SEGMENTS, buildSegment } from "@/lib/sitemaps";

// IndexNow submission endpoint. POSTs the canonical URL list to
// api.indexnow.org so Bing (and downstream consumers like ChatGPT search
// and Perplexity) re-crawl the site within minutes of a deploy instead
// of waiting on Bing's normal crawl cadence.
//
// Trigger via Vercel Cron (see vercel.json) or manually:
//   curl -X POST https://tigertest.io/api/indexnow/ping \
//     -H "Authorization: Bearer $CRON_SECRET"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

function verifyAuth(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

// The same URLs as the sitemaps, so a page added there (the vi/ko/zh DMV
// pages, translated exam landings, /teach) is submitted here too.
async function buildUrlList(): Promise<string[]> {
  const urls = new Set<string>();
  for (const segment of SITEMAP_SEGMENTS) {
    for (const entry of await buildSegment(segment)) urls.add(entry.url);
  }
  return Array.from(urls);
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
  const urls = await buildUrlList();

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
