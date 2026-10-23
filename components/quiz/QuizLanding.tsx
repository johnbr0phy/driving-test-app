"use client";

import Link from "next/link";
import { Layers, ListChecks, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingIntro } from "@/components/exam/LandingIntro";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";
import { QUIZ_TEST_MAX_QUESTIONS, quizDashboardPath, quizTopics, type QuizPublic } from "@/lib/quizzes";

/** The share URL introduces the quiz; personal progress and named play live on its dashboard. */
export function QuizLanding({ code, initial }: { code: string; initial: QuizPublic | null }) {
  const state = useQuiz(code, initial);
  if (!state.quiz) return <QuizStates code={code} state={state} />;
  return <QuizLandingContent quiz={state.quiz} />;
}

/** Pure content keeps the shared landing template testable without auth or a database. */
export function QuizLandingContent({ quiz }: { quiz: QuizPublic }) {
  const total = quiz.questions.length;
  const topics = quizTopics(quiz.questions);
  const dashboard = quizDashboardPath(quiz.code);
  const preview = quiz.questions[0];
  const start = (
    <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
      <Link href={dashboard}>Start practicing</Link>
    </Button>
  );
  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">A TigerTest quiz by {quiz.ownerName}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight break-words">{quiz.title}</h1>
          <LandingIntro subtitle={quiz.description || `Practice ${total} ${total === 1 ? "question" : "questions"} in three ways: Practice, Test and Flashcards.`} action={start}>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {total} {total === 1 ? "question" : "questions"} · {quiz.visibility === "private" ? "Private to the creator" : "Free to play, no account needed"}
            </p>
            {preview && (
              <div className="mt-12 mx-auto max-w-xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 md:p-8 shadow-lg text-left">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">A question from this quiz</p>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-50 break-words">{preview.question}</h2>
                <ul className="mt-5 grid gap-2 text-sm text-gray-700 dark:text-gray-200" aria-label="Example answer options">
                  {preview.options.map((option, i) => <li key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 break-words"><span className="font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>{option}</li>)}
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Preview only. Start practicing to answer and see the explanation.</p>
              </div>
            )}
          </LandingIntro>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24 space-y-16">
        {topics.length > 0 && (
          <section aria-labelledby="quiz-topics-heading" className="text-center">
            <h2 id="quiz-topics-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-5">What you will practice</h2>
            <ul className="flex flex-wrap justify-center gap-2">{topics.map(topic=><li key={topic} className="rounded-full bg-brand-light text-brand-darker px-4 py-2 text-sm break-words">{topic}</li>)}</ul>
          </section>
        )}
        <section aria-labelledby="quiz-modes-heading">
          <h2 id="quiz-modes-heading" className="text-2xl md:text-3xl text-center font-bold text-gray-900 dark:text-gray-50 mb-8">Three ways to learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {title:"Practice",icon:Target,text:"Answer a question, see why, and revisit misses until you get them right."},
              {title:"Test",icon:ListChecks,text:`Answer up to ${Math.min(total, QUIZ_TEST_MAX_QUESTIONS)} questions with feedback at the end. This quiz's practice pass line is ${quiz.passPct}%.`},
              {title:"Flashcards",icon:Layers,text:"Flip each card to see the answer and explanation. Mark what you know and revisit what you are still learning."},
            ].map(({title,icon:Icon,text})=>(<div key={title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6"><Icon className="w-6 h-6 text-brand-dark mb-4" aria-hidden="true"/><h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">{title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{text}</p></div>))}
          </div>
        </section>
        <section className="text-center border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Ready to give it a try?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Choose a mode on your quiz dashboard and keep track of your progress.</p>
          {start}
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">Created by {quiz.ownerName}. Questions are supplied by the creator, not an official exam provider.</p>
        </section>
      </div>
    </div>
  );
}
