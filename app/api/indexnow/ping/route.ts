import { NextRequest, NextResponse } from "next/server";
import { states } from "@/data/states";

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

function buildUrlList(): string[] {
  const urls = new Set<string>();
  urls.add(SITE_URL);
  urls.add(`${SITE_URL}/practice-tests-by-state`);
  urls.add(`${SITE_URL}/cdl-practice-test`);
  urls.add(`${SITE_URL}/es/examenes-practica-por-estado`);

  for (const state of states) {
    urls.add(`${SITE_URL}/${state.slug}-dmv-practice-test`);
    urls.add(`${SITE_URL}/es/${state.slug}-examen-practica-dmv`);
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
  const urls = buildUrlList();

  const payload = {
    host,
    key,
    keyLocation: `${SITE_URL}/api/indexnow/key`,
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
