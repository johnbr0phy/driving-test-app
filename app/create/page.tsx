"use client";

// /create: turn anything into a practice test. Step 1 picks the source
// (your connected ChatGPT or Claude, Quizlet import, write your
// own), step 2 is the editor
// (components/quiz/create/QuizEditor.tsx). Sign-in required, like /teach/new.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { QuizSync } from "@/components/quiz/QuizSync";
import { CreateSources } from "@/components/quiz/create/CreateSources";
import { QuizEditor, type QuizEditorInitial } from "@/components/quiz/create/QuizEditor";
import { MyQuizzes } from "@/components/quiz/create/MyQuizzes";
import { RecentQuizzes } from "@/components/quiz/create/RecentQuizzes";

export default function CreateQuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [draft, setDraft] = useState<{ initial: QuizEditorInitial; createdVia: "web" | "import" } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent("/create")}`);
  }, [loading, user, router]);

  useEffect(() => {
    if (draft) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [draft]);

  if (loading || !user) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <QuizSync />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        {!draft && (
          <div className="mb-8 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Turn anything into a practice test</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Have ChatGPT or Claude write the questions from your notes, import a Quizlet set, or write them yourself. You get a link anyone can open and play in Practice, Test and
              Flashcards modes, and you see who played and what they missed.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Prefer to do it from a chat?{" "}
              <Link href="/connect" className="underline">
                Use TigerTest in ChatGPT and Claude
              </Link>
              .
            </p>
          </div>
        )}

        <div className={draft ? "max-w-3xl mx-auto" : "grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start"}>
          <div className="min-w-0">
            {draft ? (
              <QuizEditor mode="create" initial={draft.initial} createdVia={draft.createdVia} onBack={() => setDraft(null)} />
            ) : (
              <CreateSources onReady={(initial, createdVia) => setDraft({ initial, createdVia })} />
            )}
          </div>

          {!draft && (
            <aside className="space-y-8 min-w-0">
              <MyQuizzes />
              <RecentQuizzes />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Looking for something to practice?{" "}
                <Link href="/quizzes" className="underline">
                  Browse quizzes other members made
                </Link>
                .
              </p>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
