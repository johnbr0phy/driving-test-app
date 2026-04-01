"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { SchoolAccount } from "@/lib/school-types";

export interface UseSchoolAuthResult {
  user: User | null;
  schoolId: string | null;
  schoolData: SchoolAccount | null;
  loading: boolean;
  error: string | null;
}

/**
 * useSchoolAuth
 *
 * Subscribes to Firebase Auth state. When a user is signed in, queries
 * school_accounts for the document where adminUid == user.uid.
 *
 * Returns:
 *   - loading: true while auth or Firestore is in flight
 *   - user: the raw Firebase Auth user (or null)
 *   - schoolId: the Firestore doc id / school slug (or null)
 *   - schoolData: the full SchoolAccount object (or null)
 *   - error: human-readable error string (or null)
 */
export function useSchoolAuth(): UseSchoolAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [schoolData, setSchoolData] = useState<SchoolAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // Not signed in — reset everything
        setUser(null);
        setSchoolId(null);
        setSchoolData(null);
        setError(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      setLoading(true);
      setError(null);

      try {
        const q = query(
          collection(db, "school_accounts"),
          where("adminUid", "==", firebaseUser.uid)
        );
        const snap = await getDocs(q);

        if (snap.empty) {
          // Authenticated but no school doc found
          setSchoolId(null);
          setSchoolData(null);
        } else {
          const docSnap: QueryDocumentSnapshot<DocumentData> = snap.docs[0];
          const data = docSnap.data() as Omit<SchoolAccount, "id">;
          setSchoolId(docSnap.id);
          setSchoolData({ id: docSnap.id, ...data } as SchoolAccount);
        }
      } catch (err: unknown) {
        console.error("[useSchoolAuth] Firestore error:", err);
        setError(
          "Could not load your school data. Check your connection and try again."
        );
        setSchoolId(null);
        setSchoolData(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, schoolId, schoolData, loading, error };
}
