/**
 * Tracked email link: records which split-test variant a person clicked,
 * then redirects to the page with UTM tags. Never shows an error to someone
 * who clicked a button in an email: a bad or missing token still redirects.
 *
 *   /api/email/click?c=newTests2026&v=v3&t=<unsubscribe token>&to=/sat-practice-test
 *
 * Writes users/{uid}.emailClicks.<c> = { variant, firstAt, lastAt, count }.
 */

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { uidFromToken } from "@/lib/unsubscribe";

const KEY_RE = /^[A-Za-z0-9_]{1,40}$/;
/** Same-site paths only: "/sat-practice-test", never "//evil.com" or a URL. */
const PATH_RE = /^\/[A-Za-z0-9/_-]*$/;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const campaign = params.get("c") ?? "";
  const variant = params.get("v") ?? "";
  const rawTo = params.get("to") ?? "/";
  const to = PATH_RE.test(rawTo) && !rawTo.startsWith("//") ? rawTo : "/";

  const dest = new URL(to, request.nextUrl.origin);
  if (KEY_RE.test(campaign)) {
    dest.searchParams.set("utm_source", "tigertest");
    dest.searchParams.set("utm_medium", "email");
    dest.searchParams.set("utm_campaign", KEY_RE.test(variant) ? `${campaign}_${variant}` : campaign);
  }

  const uid = uidFromToken(params.get("t"));
  if (uid && KEY_RE.test(campaign) && KEY_RE.test(variant)) {
    try {
      const ref = getAdminDb().collection("users").doc(uid);
      const now = new Date().toISOString();
      const snap = await ref.get();
      if (snap.exists) {
        const first = snap.data()?.emailClicks?.[campaign]?.firstAt;
        await ref.set(
          {
            emailClicks: {
              [campaign]: { variant, firstAt: first ?? now, lastAt: now, count: FieldValue.increment(1) },
            },
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("[email-click] record failed:", err);
    }
  }

  return NextResponse.redirect(dest);
}
