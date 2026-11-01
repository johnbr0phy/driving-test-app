"use client";

// /teach: the instructor landing, or (signed in with classes) your classes.

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Loader2, Plus, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";
import { quizFetch } from "@/lib/quizClient";
import { TeachLanding } from "@/components/teach/TeachLanding";
import { TeachQuizzes } from "@/components/teach/TeachQuizzes";
import { markTeacher, teachesHint } from "@/components/TeachLink";
import type { ClassSummary } from "@/lib/classes";
import type { QuizSummary } from "@/lib/quizzes";

export default function TeachPage() {
  const { user, loading } = useAuth();
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);
  const [quizzes, setQuizzes] = useState<QuizSummary[] | null>(null);
  // Set before first paint, so a teacher opening /teach never sees the landing
  // flash up while sign-in settles on a fresh load (the server render is
  // always the landing, for crawlers and signed-out visitors).
  const [deviceTeaches, setDeviceTeaches] = useState(false);
  useLayoutEffect(() => setDeviceTeaches(!!teachesHint()), []);

  useEffect(() => {
    if (!user) {
      setClasses(null);
      setQuizzes(null);
      return;
    }
    // Quizzes load alongside classes so the page appears in one piece.
    quizFetch<{ quizzes: QuizSummary[] }>(user, "/api/quizzes")
      .then((d) => setQuizzes(d.quizzes))
      .catch(() => setQuizzes([]));
    teachFetch<{ classes: ClassSummary[] }>(user, "/api/classes")
      .then((d) => {
        setClasses(d.classes);
        markTeacher(user.uid, d.classes.length > 0);
      })
      .catch(() => setClasses([]));
  }, [user]);

  // Hold an empty page instead of the landing while we find out, unless this
  // device already knows the account has no classes; a teacher's page also
  // waits for their quizzes so that section never pops in late.
  const waiting = user
    ? (classes === null && teachesHint(user.uid) !== false) || (!!classes?.length && quizzes === null)
    : loading && deviceTeaches;
  if (waiting) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 flex justify-center px-4 py-16" role="status">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" aria-hidden="true" />
        <span className="sr-only">Loading your classes…</span>
      </div>
    );
  }

  if (!user || !classes?.length) return <TeachLanding signedIn={!!user} />;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-brand-dark">For teachers</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Your classes</h1>
            </div>
            <Link href="/teach/new" className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 text-sm font-medium">
              <Plus className="w-4 h-4" aria-hidden="true" /> New class
            </Link>
          </div>
          <ul className="space-y-3">
            {classes.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/teach/classes/${c.code}`}
                  className="flex items-center gap-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-5 py-4 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-brand-dark" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-50 truncate">{c.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{c.examName} · code {c.code}</p>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-shrink-0">
                    {c.memberCount} {c.memberCount === 1 ? "student" : "students"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <TeachQuizzes quizzes={quizzes ?? []} />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            <button type="button" className="underline" onClick={() => setClasses([])}>
              How Tigertest classes work
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
