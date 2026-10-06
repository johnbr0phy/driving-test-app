import { NextRequest, NextResponse } from "next/server";
import { states } from "@/data/states";
import { siteUrl } from "@/lib/site-url";

// Cap runtime well below Vercel's 300s default so a hung upstream call cannot burn
// five minutes of Fluid Active CPU per invocation.
export const maxDuration = 30;

// IndexNow submission endpoint. POSTs the canonical URL list to
// api.indexnow.org so Bing (and downstream consumers like ChatGPT search
// and Perplexity) re-crawl the site within minutes of a deploy instead
// of waiting on Bing's normal crawl cadence.
//
// Trigger via Vercel Cron (see vercel.json) or manually:
//   curl -X POST https://www.tigertest.io/api/indexnow/ping \
//     -H "Authorization: Bearer $CRON_SECRET"

function verifyAuth(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function buildUrlList(): string[] {
  const urls = new Set<string>();
  urls.add(siteUrl);
  urls.add(`${siteUrl}/practice-tests-by-state`);
  urls.add(`${siteUrl}/cdl-practice-test`);
  urls.add(`${siteUrl}/es/examenes-practica-por-estado`);

  for (const state of states) {
    urls.add(`${siteUrl}/${state.slug}-dmv-practice-test`);
    urls.add(`${siteUrl}/es/${state.slug}-examen-practica-dmv`);
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

  const host = new URL(siteUrl).host;
  const urls = buildUrlList();

  const payload = {
    host,
    key,
    keyLocation: `${siteUrl}/api/indexnow/key`,
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
