"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";

// Graduation cap link to /teach (the teacher's class list), shown in every
// site header to a signed-in account that owns at least one class.
//
// Whether the account teaches is cached per uid in localStorage so the header
// asks /api/classes once per device, not on every page. A "no" is re-checked
// after a day in case a class was made on another device; making a class or
// opening /teach on this device updates it straight away (markTeacher).

const KEY = (uid: string) => `tigertest-teacher:${uid}`;
const RECHECK_MS = 24 * 60 * 60 * 1000;
const EVENT = "tigertest-teacher";

type Cached = { teaches: boolean; at: number };

function readCached(uid: string): Cached | null {
  try {
    const raw = localStorage.getItem(KEY(uid));
    return raw ? (JSON.parse(raw) as Cached) : null;
  } catch {
    return null;
  }
}

export function markTeacher(uid: string, teaches: boolean) {
  try {
    localStorage.setItem(KEY(uid), JSON.stringify({ teaches, at: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function TeachLink() {
  const { user } = useAuth();
  const [teaches, setTeaches] = useState(false);

  useEffect(() => {
    if (!user) {
      setTeaches(false);
      return;
    }
    const sync = () => setTeaches(!!readCached(user.uid)?.teaches);
    sync();
    window.addEventListener(EVENT, sync);

    const cached = readCached(user.uid);
    if (!cached || (!cached.teaches && Date.now() - cached.at > RECHECK_MS)) {
      teachFetch<{ classes: unknown[] }>(user, "/api/classes")
        .then((d) => markTeacher(user.uid, d.classes.length > 0))
        .catch(() => {});
    }
    return () => window.removeEventListener(EVENT, sync);
  }, [user]);

  if (!teaches) return null;
  return (
    <Link
      href="/teach"
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
      title="Your classes"
      aria-label="Your classes"
    >
      <GraduationCap className="h-5 w-5" />
    </Link>
  );
}
