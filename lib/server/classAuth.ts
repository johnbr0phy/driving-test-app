import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/admin";

export type CallerResult =
  | { ok: true; uid: string; email: string | undefined; name: string | undefined; admin: boolean }
  | { ok: false; response: NextResponse };

/** The signed-in caller, from the Bearer ID token. */
export async function requireCaller(req: Request): Promise<CallerResult> {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return { ok: false, response: NextResponse.json({ error: "Sign in first" }, { status: 401 }) };
  }
  try {
    const decoded = await getAdminAuth().verifyIdToken(header.slice("Bearer ".length));
    return {
      ok: true,
      uid: decoded.uid,
      email: decoded.email,
      name: typeof decoded.name === "string" ? decoded.name : undefined,
      admin: isAdminEmail(decoded.email),
    };
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Sign in again" }, { status: 401 }) };
  }
}

/**
 * The class's teacher (or a site admin). A class that doesn't exist answers
 * 403 like one that isn't yours, so codes can't be probed here.
 */
export async function requireClassOwner(req: Request, code: string) {
  const caller = await requireCaller(req);
  if (!caller.ok) return caller;
  const snap = await getAdminDb().collection("classes").doc(code).get();
  if (!snap.exists || (snap.data()?.teacherUid !== caller.uid && !caller.admin)) {
    return { ok: false as const, response: NextResponse.json({ error: "Not your class" }, { status: 403 }) };
  }
  return { ...caller, classData: snap.data()! };
}
