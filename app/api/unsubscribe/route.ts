/**
 * Opt a user out of all marketing email.
 *
 * Three callers, one effect:
 *   - POST with a JSON body {token}: the /unsubscribe page.
 *   - POST with the token in the query string and a form body of
 *     "List-Unsubscribe=One-Click": Gmail's and Yahoo's unsubscribe button
 *     (RFC 8058), sent from the List-Unsubscribe headers on every campaign.
 *   - GET with the token in the query string: mail clients that open the
 *     List-Unsubscribe URL in a browser instead. Redirects to the page.
 *
 * The flag it sets, users/{uid}.unsubscribed, is checked by every campaign
 * query (getEligibleUsers) and again at send time (sendCronEmail).
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { markUnsubscribed, uidFromToken } from "@/lib/unsubscribe";
import { resolveUserExamId, voiceFor } from "@/lib/email-voice";

/** "DMV test" / "citizenship test", so the page can ask the right question. */
async function testNameFor(uid: string): Promise<string> {
  try {
    const snap = await getAdminDb().collection("users").doc(uid).get();
    return voiceFor(resolveUserExamId(snap.data() ?? {})).testName;
  } catch {
    return voiceFor("dmv").testName;
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const uid = uidFromToken(token);
  const page = new URL("/unsubscribe", request.nextUrl.origin);

  if (!uid || !token) {
    return NextResponse.redirect(page);
  }

  try {
    await markUnsubscribed(uid);
    page.searchParams.set("token", token);
    page.searchParams.set("done", "1");
    page.searchParams.set("test", await testNameFor(uid));
  } catch (error) {
    console.error("[unsubscribe] GET failed:", error);
    page.searchParams.set("token", token);
  }
  return NextResponse.redirect(page);
}

export async function POST(request: NextRequest) {
  try {
    // One-click clients put the token in the URL; our own page puts it in
    // the JSON body.
    let token: unknown = request.nextUrl.searchParams.get("token");
    if (!token && request.headers.get("content-type")?.includes("application/json")) {
      token = (await request.json().catch(() => ({})))?.token;
    }

    const uid = uidFromToken(token);
    if (!uid) {
      return NextResponse.json(
        { success: false, error: token ? "Invalid token" : "Missing token" },
        { status: 400 }
      );
    }

    await markUnsubscribed(uid);

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from emails",
      testName: await testNameFor(uid),
    });
  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
