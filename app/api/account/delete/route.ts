import { NextRequest, NextResponse } from "next/server";
import { FieldPath } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

// Deletes the signed-in person's account and the data tied to it (privacy
// policy, "Delete your account"). Payment records are kept: they are needed for
// tax and refunds, hold no answers or progress, and the policy says so.
//
// Removed: users/{uid} (and its subcollections), the person's quizzes and the
// classes they teach (with every member doc), their member docs in other
// people's classes and quizzes, assistant play state, enrollments, signup
// origin, connected-assistant refresh tokens, then the Firebase Auth user.
// Question reports they sent are kept (they are about our questions) but lose
// their uid and email.

type Db = ReturnType<typeof getAdminDb>;

async function deleteWhere(db: Db, collection: string, field: string, value: string, recursive = false) {
  const snap = await db.collection(collection).where(field, "==", value).get();
  for (const d of snap.docs) {
    if (recursive) await db.recursiveDelete(d.ref);
    else await d.ref.delete();
  }
}

export async function POST(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  let uid: string;
  try {
    // checkRevoked + a recent sign-in: a token lifted from an old session
    // cannot delete the account.
    const token = await getAdminAuth().verifyIdToken(header.slice(7), true);
    const signedInSecondsAgo = Date.now() / 1000 - (token.auth_time ?? 0);
    if (signedInSecondsAgo > 60 * 60 * 24 * 7) {
      return NextResponse.json({ error: "reauth" }, { status: 403 });
    }
    uid = token.uid;
  } catch {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }

  const db = getAdminDb();
  try {
    const userRef = db.collection("users").doc(uid);
    const user = (await userRef.get()).data() ?? {};

    // Member docs this person holds in other people's classes and quizzes.
    const memberships: Array<{ code?: unknown; memberId?: unknown; kind?: unknown }> = Array.isArray(user.classMemberships)
      ? user.classMemberships
      : [];
    for (const m of memberships) {
      if (typeof m.code !== "string" || typeof m.memberId !== "string") continue;
      const parent = m.kind === "quiz" ? "quizzes" : "classes";
      await db.collection(parent).doc(m.code).collection("members").doc(m.memberId).delete().catch(() => {});
    }

    // Assistant play: mcpQuizPlay/{uid}_{code}, plus the u_<uid> member doc it
    // made on someone else's quiz.
    const plays = await db
      .collection("mcpQuizPlay")
      .where(FieldPath.documentId(), ">=", `${uid}_`)
      .where(FieldPath.documentId(), "<", `${uid}_`)
      .get();
    for (const d of plays.docs) {
      const code = d.id.slice(uid.length + 1);
      if (code) await db.collection("quizzes").doc(code).collection("members").doc(`u_${uid}`).delete().catch(() => {});
      await d.ref.delete();
    }

    await deleteWhere(db, "quizzes", "ownerUid", uid, true);
    await deleteWhere(db, "classes", "teacherUid", uid, true);
    await deleteWhere(db, "enrollments", "uid", uid);
    const reports = await db.collection("questionReports").where("uid", "==", uid).get();
    for (const d of reports.docs) await d.ref.update({ uid: null, email: null });
    await deleteWhere(db, "oauth_refresh_tokens", "userId", uid);
    await db.collection("signupOrigins").doc(uid).delete().catch(() => {});
    await db.recursiveDelete(userRef);

    await getAdminAuth().deleteUser(uid);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[account/delete]", uid, err);
    return NextResponse.json({ error: "Could not delete the account. Email john@johnbrophy.net and we will do it by hand." }, { status: 500 });
  }
}
