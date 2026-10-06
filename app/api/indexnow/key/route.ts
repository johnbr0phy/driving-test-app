import { NextResponse } from "next/server";

// Cap runtime well below Vercel's 300s default so a hung upstream call cannot burn
// five minutes of Fluid Active CPU per invocation.
export const maxDuration = 30;

// IndexNow ownership-verification endpoint. Bing/Yandex/etc. fetch this URL
// to confirm the site owner controls the key used in the ping payload.
//
// Set INDEXNOW_KEY to a 8–128 character hex string in your environment.
// The same value must be used in the ping payload at /api/indexnow/ping.

export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new NextResponse("Not configured", { status: 404 });
  }
  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
