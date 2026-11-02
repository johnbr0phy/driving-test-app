"use client";

import { useEffect, useState } from "react";
import { getMemberships, type ClassMembership } from "@/lib/classProgress";
import { MEMBERSHIPS_CHANGED } from "@/lib/classMembershipSync";

/**
 * This browser's class and quiz memberships, kept current: the account's list
 * arrives after sign-in and sign-out clears it (lib/classMembershipSync.ts),
 * while the header and the page stay mounted. Empty until after hydration.
 */
export function useClassMemberships(): ClassMembership[] {
  const [list, setList] = useState<ClassMembership[]>([]);
  useEffect(() => {
    const read = () => setList(getMemberships());
    read();
    window.addEventListener(MEMBERSHIPS_CHANGED, read);
    // Another tab joined, left, signed in or out.
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "tigertest-classes") read();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MEMBERSHIPS_CHANGED, read);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return list;
}

/** True when a membership practises this exam in a teacher's class (not a quiz), which keeps Premium-only stats open. */
export function inClassFor(list: ClassMembership[], ...examIds: (string | undefined)[]): boolean {
  return list.some((m) => m.kind !== "quiz" && examIds.includes(m.examId));
}
