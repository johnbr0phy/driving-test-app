import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { listPublicQuizzes } from "@/lib/server/quizzes";
import type { QuizSummary } from "@/lib/quizzes";
import { QuizLibrary } from "@/components/quiz/create/QuizLibrary";

// The public quiz library: quizzes members set to Public that enough people
// have played, most played first. Rebuilt every five minutes.

export const revalidate = 300;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const title = "Practice tests made by TigerTest members";
const description =
  "Browse practice tests other TigerTest members made from their own notes and study sets, play any in Practice, Test or Flashcards mode, or make your own.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/quizzes` },
  openGraph: { title, description, url: `${siteUrl}/quizzes`, siteName: "TigerTest", type: "website" },
  twitter: { card: "summary", title, description },
};

export default async function QuizzesPage() {
  let quizzes: QuizSummary[] = [];
  try {
    quizzes = await listPublicQuizzes(100);
  } catch (e) {
    // No Firestore (a build without credentials) or a read error: show the empty library rather than fail the page.
    console.error("[quizzes] could not list public quizzes", e);
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-4xl">
        <div className="mb-8 sm:flex sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Every quiz here was made by a member from their own material and opened up for everyone. Play one in Practice, Test or Flashcards mode.
            </p>
          </div>
          <Link
            href="/create"
            className="mt-5 sm:mt-0 inline-flex items-center gap-2 flex-shrink-0 rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 font-medium"
          >
            <Plus className="w-4 h-4" aria-hidden="true" /> Make your own
          </Link>
        </div>

        <QuizLibrary quizzes={quizzes} />

        <div className="mt-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Make your own practice test</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
            Paste your notes, import a Quizlet set or write the questions yourself. You get a link to share and a report of who played and what they missed.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 font-medium"
          >
            <Plus className="w-4 h-4" aria-hidden="true" /> Make your own
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Or do it from a chat:{" "}
            <Link href="/connect" className="underline">
              use TigerTest in ChatGPT and Claude
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
