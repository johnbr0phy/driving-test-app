import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// Cap runtime well below Vercel's 300s default so a hung upstream call cannot burn
// five minutes of Fluid Active CPU per invocation.
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 }
      );
    }

    // Decode token (base64 encoded userId)
    let userId: string;
    try {
      userId = Buffer.from(token, "base64").toString("utf-8");
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 400 }
      );
    }

    // Update user document to set unsubscribed flag
    const db = getAdminDb();
    await db.collection("users").doc(userId).update({
      unsubscribed: true,
      unsubscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from emails",
    });
  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
