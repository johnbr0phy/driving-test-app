"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
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
 * Wraps the main TigerTest useAuth hook. When a user is signed in, queries
 * school_accounts for the document where adminUid == user.uid.
 */
export function useSchoolAuth(): UseSchoolAuthResult {
  const { user, loading: authLoading } = useAuth();
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [schoolData, setSchoolData] = useState<SchoolAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setSchoolId(null);
      setSchoolData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchSchool() {
      setLoading(true);
      setError(null);

      try {
        const q = query(
          collection(db, "school_accounts"),
          where("adminUid", "==", user!.uid)
        );
        const snap = await getDocs(q);

        if (cancelled) return;

        if (snap.empty) {
          setSchoolId(null);
          setSchoolData(null);
        } else {
          const docSnap: QueryDocumentSnapshot<DocumentData> = snap.docs[0];
          const data = docSnap.data() as Omit<SchoolAccount, "id">;
          setSchoolId(docSnap.id);
          setSchoolData({ id: docSnap.id, ...data } as SchoolAccount);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        console.error("[useSchoolAuth] Firestore error:", err);
        setError(
          "Could not load your school data. Check your connection and try again."
        );
        setSchoolId(null);
        setSchoolData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSchool();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { user, schoolId, schoolData, loading, error };
}
