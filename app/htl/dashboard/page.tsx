"use client";

import { Suspense } from "react";
import { TestCard } from "@/components/TestCard";
import { TrainingSetCard, TrainingSet } from "@/components/TrainingSetCard";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import {
  HTL_TEST_COUNT,
  HTL_TRAINING_SETS,
  HTL_PASS_PERCENTAGE,
  htlTestId,
} from "@/lib/htlConfig";

function getTigerFace(probability: number): string {
  if (probability >= 100) return "/tiger_face_01.png";
  if (probability >= 85) return "/tiger_face_02.png";
  if (probability >= 70) return "/tiger_face_03.png";
  if (probability >= 55) return "/tiger_face_04.png";
  if (probability >= 40) return "/tiger_face_05.png";
  if (probability >= 25) return "/tiger_face_06.png";
  if (probability >= 10) return "/tiger_face_07.png";
  return "/tiger_face_08.png";
}

function HTLDashboardContent() {
  const hydrated = useHydration();
  const isGuest = useStore((state) => state.isGuest);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const getHTLPassProbability = useStore((state) => state.getHTLPassProbability);

  const passProbability = hydrated ? getHTLPassProbability() : 0;

  const trainingSets: TrainingSet[] = HTL_TRAINING_SETS.map((def) => {
    const progress = hydrated ? getTrainingSetProgress(def.id) : { correct: 0, total: def.size };
    return {
      id: def.id,
      name: def.name,
      correctCount: progress.correct,
      targetCount: def.size,
    };
  });

  const getTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const id = htlTestId(testNumber);
    const currentTest = getCurrentTest(id);
    if (currentTest && currentTest.questions.length > 0) return "in-progress";
    if (getTestSession(id)) return "completed";
    return "not-started";
  };

  const getTestProgress = (testNumber: number): number => {
    const currentTest = getCurrentTest(htlTestId(testNumber));
    if (!currentTest) return 0;
    const answered = Object.keys(currentTest.answers).length;
    const total = currentTest.questions.length;
    return total > 0 ? Math.round((answered / total) * 100) : 0;
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link
            href="/htl"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to HTL Practice Test
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            HTL Practice Dashboard
          </h1>
          <p className="text-gray-600">
            Prepare for the ASCP Histotechnologist (HTL) and Histotechnician (HT) exams with 200
            questions weighted to the official content guideline
          </p>
        </div>

        {isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📊</div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Sign Up</span> to track your HTL progress and view detailed statistics
                  </p>
                  <Link href="/signup" className="text-sm text-brand hover:text-brand-dark font-medium mt-1 inline-block">
                    Create Free Account
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!isGuest && passProbability > 0 && (
          <Link href="/htl/stats" className="block">
            <Card className={`mb-6 cursor-pointer transition-shadow hover:shadow-lg ${
              passProbability >= 80
                ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
                : passProbability >= 60
                  ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200"
                  : passProbability >= 40
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
                    : passProbability >= 20
                      ? "bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light"
                      : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={getTigerFace(passProbability)}
                    alt="Tiger mascot"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-bold text-gray-900">
                      {passProbability > 50
                        ? <>{passProbability}% chance of passing the HTL exam</>
                        : <>{100 - passProbability}% chance of failing the HTL exam</>
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-1 md:hidden">Learn how to improve</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden md:inline">View Stats</span>
                    <ChevronRight className="h-6 w-6 text-brand-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-xl font-bold">Training by Content Area</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            One set per ASCP content area. Instant feedback, and missed questions come back until you master them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trainingSets.map((set, index) => (
              <TrainingSetCard
                key={set.id}
                set={set}
                isPremiumLocked={false}
                onPremiumClick={() => {}}
                href={`/htl/training?set=${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">HTL Practice Tests</h2>
          <p className="text-sm text-gray-500 mb-4">
            50-question tests weighted like the real exam: staining, fixation, embedding/microtomy,
            processing, and lab operations ({HTL_PASS_PERCENTAGE}% to pass)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: HTL_TEST_COUNT }, (_, i) => i + 1).map((testNumber) => {
              const id = htlTestId(testNumber);
              const session = hydrated ? getTestSession(id) : undefined;
              const attemptStats = hydrated ? getTestAttemptStats(id) : undefined;
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={hydrated ? getTestStatus(testNumber) : "not-started"}
                  score={session?.score}
                  progress={hydrated ? getTestProgress(testNumber) : 0}
                  totalQuestions={50}
                  bestScore={attemptStats?.bestScore}
                  isPremiumLocked={false}
                  onPremiumClick={() => {}}
                  href={`/htl/test/${id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HTLDashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-white" />}>
      <HTLDashboardContent />
    </Suspense>
  );
}
