import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * POST /api/schools/signup-attempt
 *
 * Rate-limits school signup to MAX_ATTEMPTS per IP per hour.
 * Call this BEFORE creating the Firebase Auth user on the client.
 *
 * Returns { allowed: true } or { allowed: false, message: "..." } with HTTP 429.
 *
 * Uses Firestore collection `signup_rate_limits` keyed by a sanitised IP.
 * Doc structure: { count: number, windowStart: Timestamp }
 * Resets automatically when the current time exceeds windowStart + WINDOW_MS.
 */
export async function POST(req: NextRequest) {
  // Extract IP from standard headers (Vercel / proxies set x-forwarded-for)
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0] : null) ?? "unknown";

  // Sanitise IP so it's a safe Firestore key (colons → underscores for IPv6)
  const key = ip.trim().replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 128);

  const db = getAdminDb();
  if (!db) {
    // If admin SDK unavailable, fail open (don't block signups)
    return NextResponse.json({ allowed: true });
  }

  const ref = db.collection("signup_rate_limits").doc(key);

  try {
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const now = Date.now();

      if (!snap.exists) {
        // First attempt — create the window
        tx.set(ref, { count: 1, windowStart: now });
        return { allowed: true, count: 1 };
      }

      const data = snap.data() as { count: number; windowStart: number };
      const windowStart: number =
        typeof data.windowStart === "number"
          ? data.windowStart
          : (data.windowStart as { toMillis: () => number }).toMillis();

      if (now - windowStart > WINDOW_MS) {
        // Window expired — reset
        tx.set(ref, { count: 1, windowStart: now });
        return { allowed: true, count: 1 };
      }

      if (data.count >= MAX_ATTEMPTS) {
        const retryAfterMs = WINDOW_MS - (now - windowStart);
        const retryAfterMin = Math.ceil(retryAfterMs / 60000);
        return {
          allowed: false,
          retryAfterMin,
          count: data.count,
        };
      }

      // Increment within window
      tx.update(ref, { count: FieldValue.increment(1) });
      return { allowed: true, count: data.count + 1 };
    });

    if (!result.allowed) {
      return NextResponse.json(
        {
          allowed: false,
          message: `Too many signup attempts. Please try again in ${result.retryAfterMin} minute${result.retryAfterMin === 1 ? "" : "s"}.`,
        },
        { status: 429 }
      );
    }

    return NextResponse.json({ allowed: true });
  } catch (err) {
    console.error("signup-attempt rate limit error:", err);
    // Fail open — don't block signups due to Firestore errors
    return NextResponse.json({ allowed: true });
  }
}
