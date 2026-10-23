"use client";

// The account part of /create: "Your quizzes" for a signed-in visitor and
// "Recently played" for anyone whose browser has opened a quiz. Renders
// nothing for a first-time signed-out visitor, who only needs the setup guide.

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuizStore } from "@/store/useQuizStore";
import { QuizSync } from "@/components/quiz/QuizSync";
import { MyQuizzes } from "@/components/quiz/create/MyQuizzes";
import { RecentQuizzes } from "@/components/quiz/create/RecentQuizzes";

export function CreateYourQuizzes() {
  const { user, loading } = useAuth();
  const recentCount = useQuizStore((s) => s.recent.length);
  // The store rehydrates from localStorage after mount; wait so SSR and the first client paint agree.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const show = hydrated && !loading && (user || recentCount > 0);

  return (
    <>
      <QuizSync />
      {show && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-12 pb-16 md:pb-20">
          <div className={`grid gap-8 ${user && recentCount > 0 ? "md:grid-cols-2" : "max-w-2xl"}`}>
            <MyQuizzes />
            <RecentQuizzes />
          </div>
        </div>
      )}
    </>
  );
}
