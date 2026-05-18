import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import {
  PARENT_PAY_TOKEN_TTL_DAYS,
  buildEmailShareBody,
  buildEmailShareSubject,
  buildParentPayUrl,
  buildSmsShareBody,
  generateParentPayToken,
} from "@/lib/parent-pay";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const teenUid = decoded.uid;

    const db = getAdminDb();
    const userSnap = await db.collection("users").doc(teenUid).get();
    if (userSnap.exists) {
      const userData = userSnap.data() as Record<string, unknown>;
      const subscription = userData.subscription as Record<string, unknown> | undefined;
      if (subscription?.isPremium === true) {
        return NextResponse.json(
          { error: "You already have Premium." },
          { status: 400 },
        );
      }
    }

    const now = new Date();
    const expires = new Date(now.getTime() + PARENT_PAY_TOKEN_TTL_DAYS * 86400000);
    const token = generateParentPayToken();

    await db.collection("parentPayRequests").doc(token).set({
      teenUid,
      status: "pending",
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      createdAtServer: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      token,
      url: buildParentPayUrl(SITE_URL, token),
      smsBody: buildSmsShareBody(SITE_URL, token),
      emailSubject: buildEmailShareSubject(),
      emailBody: buildEmailShareBody(SITE_URL, token),
      expiresAt: expires.toISOString(),
    });
  } catch (error) {
    console.error("[parent-pay/request]", error);
    return NextResponse.json(
      { error: "Failed to create parent-pay link" },
      { status: 500 },
    );
  }
}
