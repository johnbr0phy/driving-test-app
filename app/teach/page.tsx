"use client";

// For instructors: what a TigerTest class is, and (signed in) your classes.

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, Link2, Plus, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";
import type { ClassSummary } from "@/lib/classes";

const STEPS = [
  { icon: Plus, title: "Make a class", body: "Pick the exam your students are preparing for. It takes a minute and it's free." },
  { icon: Link2, title: "Post one link", body: "Paste it into Canvas, Blackboard or an email. Students join with just their name, no account." },
  { icon: BarChart3, title: "See who's practicing", body: "Questions answered, accuracy and test scores for every student, and the topics your class misses most." },
];

export default function TeachPage() {
  const { user, loading } = useAuth();
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    teachFetch<{ classes: ClassSummary[] }>(user, "/api/classes")
      .then((d) => setClasses(d.classes))
      .catch((e) => setError(e.message));
  }, [user]);

  const showList = !!user && classes !== null && classes.length > 0;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
        {showList ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your classes</h1>
              <Link href="/teach/new" className="inline-flex items-center gap-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium">
                <Plus className="w-4 h-4" aria-hidden="true" /> New class
              </Link>
            </div>
            <ul className="space-y-3">
              {classes!.map((c) => (
                <li key={c.code}>
                  <Link
                    href={`/teach/classes/${c.code}`}
                    className="flex items-center justify-between gap-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-5 py-4 hover:border-gray-400 dark:hover:border-gray-600"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 truncate">{c.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{c.examName} · code {c.code}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 flex-shrink-0">
                      <Users className="w-4 h-4" aria-hidden="true" /> {c.memberCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">For instructors</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">Free practice tests for your class</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Surgical tech, histotech, sterile processing, CNA, phlebotomy, medical assistant, real estate and two dozen more certification exams. Post one link, and see who practiced and what your class keeps missing.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              {STEPS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
                  <Icon className="w-5 h-5 text-gray-900 dark:text-gray-50 mb-3" aria-hidden="true" />
                  <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{body}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={user ? "/teach/new" : "/signup?redirect=/teach/new"}
                className="inline-flex items-center rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 px-5 py-3 font-medium"
              >
                Create a free class
              </Link>
              {!user && !loading && (
                <Link href="/login?redirect=/teach" className="text-sm underline text-gray-700 dark:text-gray-200">
                  Already have an account? Sign in
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Free for you and your students. Students only give a name. Questions? Email john@tigertest.io.
            </p>
            {error && <p className="text-sm text-red-600 dark:text-red-400 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
