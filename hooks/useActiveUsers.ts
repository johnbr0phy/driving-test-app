"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getCountFromServer, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Returns the count of users active in the last 5 minutes.
 * Refreshes every 60 seconds.
 */
export function useActiveUsers() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const fiveMinutesAgo = Timestamp.fromMillis(Date.now() - 5 * 60 * 1000);
        const q = query(
          collection(db, "presence"),
          where("lastSeen", ">", fiveMinutesAgo)
        );
        const snapshot = await getCountFromServer(q);
        setCount(snapshot.data().count);
      } catch {
        // Silently fail
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  return count;
}
