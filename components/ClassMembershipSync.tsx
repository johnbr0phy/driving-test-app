"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { flushClassProgress, getMemberships, replaceMemberships } from "@/lib/classProgress";
import {
  loadAccountMemberships,
  mergeMemberships,
  setSyncedUid,
  syncedUid,
  updateAccountMemberships,
} from "@/lib/classMembershipSync";

/**
 * Keeps this browser's class and quiz memberships a copy of the signed-in
 * account's (mounted once in the root layout). On sign-in a guest's
 * memberships are added to the account; on sign-out the copy is cleared, so
 * the next person on this browser never reports to someone else's class.
 */
export function ClassMembershipSync() {
  const { user, loading } = useAuth();
  const uid = user?.uid ?? null;

  useEffect(() => {
    if (loading) return;
    const prev = syncedUid();

    if (!uid) {
      if (prev) {
        flushClassProgress();
        replaceMemberships([]);
        setSyncedUid(null);
      }
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const local = getMemberships();
        // A guest's joins move up to the account; a copy that belongs to this
        // or another account is replaced by this account's list.
        const guest = prev ? [] : local;
        const fresh = guest.length
          ? await updateAccountMemberships(uid, (account) => mergeMemberships(guest, account))
          : await loadAccountMemberships(uid);
        if (cancelled) return;
        if (prev && prev !== uid) flushClassProgress();
        replaceMemberships(fresh);
        setSyncedUid(uid);
      } catch (e) {
        console.error("class membership load failed", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uid, loading]);

  return null;
}
