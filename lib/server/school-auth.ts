import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/admin";

export type SchoolAuthResult =
  | { ok: true; uid: string }
  | { ok: false; response: NextResponse };

/**
 * Gate for /api/schools/[schoolId]/* routes.
 *
 * These handlers all run through the Firebase Admin SDK, which bypasses
 * Firestore rules entirely — so without a check here the routes are wide
 * open. School ids are human-readable slugs ("fremont-driving-school"), so
 * "nobody knows the id" was never a control.
 *
 * A caller is allowed if they hold a valid Firebase ID token AND either:
 *   - their uid matches school_accounts/{schoolId}.adminUid, or
 *   - they're a site admin (mirrors the dashboard's ?school= override).
 *
 * Missing/!valid token → 401. Valid token, wrong school → 403. A school that
 * doesn't exist also returns 403, not 404, so this can't be used to probe
 * which school ids are real.
 */
export async function requireSchoolAdmin(
  req: Request,
  schoolId: string
): Promise<SchoolAuthResult> {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(header.slice("Bearer ".length));
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }

  if (isAdminEmail(decoded.email)) {
    return { ok: true, uid: decoded.uid };
  }

  const snap = await getAdminDb()
    .collection("school_accounts")
    .doc(schoolId)
    .get();

  if (!snap.exists || snap.data()?.adminUid !== decoded.uid) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, uid: decoded.uid };
}
