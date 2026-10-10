/**
 * Records "what test should we build next?" answers.
 *
 *   GET  ?pick=<id>&t=<token>&src=email|unsubscribe
 *        One click from an email or the unsubscribe page. Writes the pick,
 *        then redirects to /request-test to ask for the exact exam. The
 *        redirect happens even if the write fails: the person should never
 *        see an error for clicking a button in an email.
 *
 *   POST {token?, pick, details}
 *        The free-text follow-up from /request-test. Stores the text and
 *        emails John, because a named exam is the signal that decides what
 *        gets built next.
 *
 * One doc per user per pick (testRequests/{uid}_{pick}) so repeated clicks
 * count once. Anonymous answers (no token) get their own doc each.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { uidFromToken } from "@/lib/unsubscribe";
import { resolveUserExamId } from "@/lib/email-voice";
import { sendEmail } from "@/lib/resend";
import { CAMPAIGN_REPLY_TO } from "@/lib/cron-email";
import {
  asTestRequestSource,
  getTestRequestPick,
  TEST_REQUEST_MAX_DETAILS,
  TestRequestSource,
} from "@/lib/test-requests";

interface RecordArgs {
  uid: string | null;
  pick: string;
  source: TestRequestSource;
  details?: string;
}

async function recordRequest({ uid, pick, source, details }: RecordArgs): Promise<void> {
  const db = getAdminDb();
  const now = new Date().toISOString();

  let examId: string | null = null;
  if (uid) {
    const user = await db.collection("users").doc(uid).get();
    if (user.exists) examId = resolveUserExamId(user.data() ?? {});
  }

  const ref = uid
    ? db.collection("testRequests").doc(`${uid}_${pick}`)
    : db.collection("testRequests").doc();
  const existing = uid ? (await ref.get()).exists : false;

  await ref.set(
    {
      uid,
      pick,
      source,
      examId,
      ...(details ? { details } : {}),
      ...(existing ? {} : { createdAt: now }),
      updatedAt: now,
    },
    { merge: true }
  );
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const pick = getTestRequestPick(params.get("pick"));
  const token = params.get("t") ?? "";
  const uid = uidFromToken(token);
  const source = asTestRequestSource(params.get("src"));

  const next = new URL("/request-test", request.nextUrl.origin);
  if (pick) next.searchParams.set("pick", pick.id);
  if (uid) next.searchParams.set("t", token);
  next.searchParams.set("src", source);
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const v = params.get(key);
    if (v) next.searchParams.set(key, v);
  }

  if (pick) {
    try {
      await recordRequest({ uid, pick: pick.id, source });
    } catch (error) {
      console.error("[test-request] GET write failed:", error);
    }
  }

  return NextResponse.redirect(next);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const pick = getTestRequestPick(body?.pick) ?? getTestRequestPick("other")!;
    const uid = uidFromToken(body?.token);
    const source = asTestRequestSource(body?.source);
    const details =
      typeof body?.details === "string"
        ? body.details.trim().slice(0, TEST_REQUEST_MAX_DETAILS)
        : "";

    if (details.length < 2) {
      return NextResponse.json({ success: false, error: "Tell us which test" }, { status: 400 });
    }

    await recordRequest({ uid, pick: pick.id, source, details });

    // A named exam is worth an immediate heads-up. Transactional budget, so a
    // busy campaign day can never crowd it out.
    const notify = await sendEmail({
      kind: "transactional",
      to: CAMPAIGN_REPLY_TO,
      subject: `Test request: ${details.slice(0, 60)}`,
      html: `<p><strong>${escapeHtml(details)}</strong></p>
<p>Category: ${pick.label}<br>Source: ${source}<br>User: ${uid ?? "anonymous"}</p>`,
    });
    if (!notify.ok) console.error("[test-request] notify failed:", notify.error);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[test-request] POST failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
