import { doc, getDoc, runTransaction } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { ClassMembership } from "@/lib/classProgress";

// Class and quiz memberships (lib/classProgress.ts) belong to the account
// once someone is signed in: users/{uid}.classMemberships holds the list, and
// the browser's tigertest-classes is a copy of it. A guest's memberships stay
// in the browser until sign-in, when they are added to the account. Signing
// out clears the browser's copy. components/ClassMembershipSync.tsx runs the
// sign-in and sign-out side; joins and leaves call changeAccountMemberships.

export const MEMBERSHIPS_CHANGED = "tigertest-classes-changed";
/** The account the browser's copy belongs to (absent while a guest). */
export const SYNCED_UID_KEY = "tigertest-classes-uid";
const MAX_MEMBERSHIPS = 50;

function clean(list: ClassMembership[]): ClassMembership[] {
  return JSON.parse(JSON.stringify(list.slice(-MAX_MEMBERSHIPS)));
}

function isMembership(m: unknown): m is ClassMembership {
  const x = m as ClassMembership;
  return !!x && typeof x.code === "string" && typeof x.memberId === "string" && typeof x.examId === "string";
}

export function syncedUid(): string | null {
  try {
    return localStorage.getItem(SYNCED_UID_KEY);
  } catch {
    return null;
  }
}

export function setSyncedUid(uid: string | null) {
  try {
    if (uid) localStorage.setItem(SYNCED_UID_KEY, uid);
    else localStorage.removeItem(SYNCED_UID_KEY);
  } catch {
    // Storage blocked: memberships only last for this page anyway.
  }
}

export async function loadAccountMemberships(uid: string): Promise<ClassMembership[]> {
  const snap = await getDoc(doc(db, "users", uid));
  const list = snap.exists() ? snap.data().classMemberships : undefined;
  return Array.isArray(list) ? list.filter(isMembership) : [];
}

/**
 * Apply a change to the account's list in a transaction, so a join on one
 * device never overwrites a leave on another. Returns the account's list.
 */
export async function updateAccountMemberships(
  uid: string,
  change: (list: ClassMembership[]) => ClassMembership[],
): Promise<ClassMembership[]> {
  const ref = doc(db, "users", uid);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists() && Array.isArray(snap.data().classMemberships) ? snap.data().classMemberships.filter(isMembership) : [];
    const next = clean(change(current));
    if (snap.exists()) tx.update(ref, { classMemberships: next });
    else tx.set(ref, { classMemberships: next }, { merge: true });
    return next;
  });
}

/**
 * A join or leave made in this browser, mirrored to the signed-in account
 * (a no-op for guests). `remove` is a code to drop; `add` replaces any entry
 * with its code.
 */
export function changeAccountMemberships(op: { add?: ClassMembership; remove?: string }) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const code = op.add?.code ?? op.remove;
  void updateAccountMemberships(uid, (list) => [...list.filter((m) => m.code !== code), ...(op.add ? [op.add] : [])]).catch((e) =>
    console.error("class membership sync failed", e),
  );
}

/** Pure: a guest's memberships added to the account's; the account's entry wins for a class in both. */
export function mergeMemberships(guest: ClassMembership[], account: ClassMembership[]): ClassMembership[] {
  const codes = new Set(account.map((m) => m.code));
  return [...account, ...guest.filter((m) => !codes.has(m.code))];
}
