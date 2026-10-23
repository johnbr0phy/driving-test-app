"use client";

// /q with no code: type a quiz code from a friend or a projector, see the
// quizzes this browser played recently, or go make one.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecentQuizzes } from "@/components/quiz/create/RecentQuizzes";
import { QUIZ_CODE_LENGTH, isQuizCode, normalizeQuizCode, quizPath } from "@/lib/quizzes";

export default function QuizIndexPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeQuizCode(code.replace(/^.*\/q\//i, ""));
    if (!isQuizCode(normalized)) {
      setError(`A quiz code is ${QUIZ_CODE_LENGTH} letters and numbers, like the end of tigertest.io/q/ABC234`);
      return;
    }
    router.push(quizPath(normalized));
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">Open a quiz</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Enter the code from the link you were sent.</p>
          <form onSubmit={go} className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="ABC234"
              aria-label="Quiz code"
              autoCapitalize="characters"
              autoComplete="off"
              className="font-mono tracking-widest"
            />
            <Button type="submit" className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              Go <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </form>
          {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
        </div>

        <RecentQuizzes />

        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">Make your own</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Connect your own Claude or ChatGPT to write and save a quiz, import a Quizlet set, or use the manual editor.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/create" className="underline text-gray-900 dark:text-gray-50">Make a quiz</Link>
            <Link href="/quizzes" className="underline text-gray-700 dark:text-gray-200">Browse the library</Link>
            <Link href="/connect" className="underline text-gray-700 dark:text-gray-200">Use it in ChatGPT or Claude</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
