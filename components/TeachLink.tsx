"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMemberships, type ClassMembership } from "@/lib/classProgress";
import type { ClassSummary } from "@/lib/classes";
import { teachFetch } from "@/lib/teachClient";

// Whether a signed-in account owns at least one class, for the "Your classes"
// item in the header's account menu (SiteHeader).
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

// What this device last knew: true / false for a uid, or for no uid (auth not
// settled yet) whether any account on it teaches. null means never checked.
export function teachesHint(uid?: string): boolean | null {
  if (uid) return readCached(uid)?.teaches ?? null;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("tigertest-teacher:") && readCached(k.slice(18))?.teaches) return true;
    }
  } catch {}
  return false;
}

export function markTeacher(uid: string, teaches: boolean) {
  try {
    localStorage.setItem(KEY(uid), JSON.stringify({ teaches, at: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Whether the signed-in account owns a class (the account menu's "Your classes"). */
export function useTeaches(): boolean {
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

  return teaches;
}

// The class a teacher last opened, so the header's CLASSES tab goes straight back to it.
const CURRENT_CLASS_KEY = "tigertest-current-class";

export function rememberCurrentClass(code: string) {
  try {
    localStorage.setItem(CURRENT_CLASS_KEY, code);
  } catch {}
}

export function currentClassCode(): string | null {
  try {
    return localStorage.getItem(CURRENT_CLASS_KEY);
  } catch {
    return null;
  }
}

/** The signed-in teacher's classes, fetched while `enabled` (the header's class pill). */
export function useTeacherClasses(enabled: boolean): ClassSummary[] | null {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);

  useEffect(() => {
    if (!user || !enabled) return;
    let alive = true;
    teachFetch<{ classes: ClassSummary[] }>(user, "/api/classes")
      .then((d) => {
        if (!alive) return;
        setClasses(d.classes);
        markTeacher(user.uid, d.classes.length > 0);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [user, enabled]);

  return classes;
}

/** The latest class (not quiz) this browser joined as a student, read after hydration. */
export function useStudentClass(): ClassMembership | null {
  const [membership, setMembership] = useState<ClassMembership | null>(null);
  useEffect(() => {
    const classes = getMemberships().filter((m) => m.kind !== "quiz");
    setMembership(classes[classes.length - 1] ?? null);
  }, []);
  return membership;
}
