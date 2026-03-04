"use client";

import { useEffect, useRef } from "react";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Tracks the current user's presence in Firestore.
 * Writes to presence/{userId} on mount and every 60s.
 * Cleans up on unmount.
 */
export function usePresence(userId: string | null) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!userId) return;

    const presenceRef = doc(db, "presence", userId);

    const updatePresence = async () => {
      try {
        await setDoc(presenceRef, {
          lastSeen: serverTimestamp(),
          userId,
        });
      } catch {
        // Silently fail — presence is non-critical
      }
    };

    const cleanup = async () => {
      try {
        await deleteDoc(presenceRef);
      } catch {
        // Silently fail
      }
    };

    updatePresence();
    intervalRef.current = setInterval(updatePresence, 60_000);

    window.addEventListener("beforeunload", cleanup);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("beforeunload", cleanup);
      cleanup();
    };
  }, [userId]);
}
