"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Target,
  CheckCircle2,
  Lock,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Zap,
  Trophy,
} from "lucide-react";
import { states } from "@/data/states";

// Free tier: 3 practice tests × ~25q = 75 unique questions exposed before paywall kicks in
const FREE_QUESTIONS_AVAILABLE = 75;
// Full bank per state averages ~300 unique questions
const PREMIUM_QUESTIONS_AVAILABLE = 300;
// How many unique questions experts recommend seeing before the real test
const QUESTIONS_NEEDED_TO_BE_READY = 200;
// Questions per day in a focused session
const DAILY_QUESTIONS_FREE = 25;
const DAILY_QUESTIONS_PREMIUM = 50;

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type ReadinessLevel = "on-track" | "tight" | "at-risk";

interface PlanResult {
  daysLeft: number;
  testDateFormatted: string;
  stateName: string;
  stateQuestions: number;
  passingScore: number;
  questionsNeeded: number;
  // Free path
  freeQuestionsPerDay: number;
  freeTotalReachable: number;
  freeReadiness: ReadinessLevel;
  freeMessage: string;
  // Premium path
  premiumQuestionsPerDay: number;
  premiumTotalReachable: number;
  premiumReadiness: ReadinessLevel;
  premiumMessage: string;
}

function calcPlan(testDate: string, stateSlug: string): PlanResult {
  const state = states.find((s) => s.slug === stateSlug) ?? states[0];
  const daysLeft = getDaysUntil(testDate);
  const questionsNeeded = QUESTIONS_NEEDED_TO_BE_READY;

  // Free path
  const freeTotalReachable = Math.min(
    FREE_QUESTIONS_AVAILABLE,
    daysLeft * DAILY_QUESTIONS_FREE
  );
  const freeGap = questionsNeeded - freeTotalReachable;
  let freeReadiness: ReadinessLevel;
  let freeMessage: string;
  if (freeTotalReachable >= questionsNeeded) {
    freeReadiness = "on-track";
    freeMessage = "You could reach ready — but free questions run out fast as topics repeat.";
  } else if (freeGap <= 50) {
    freeReadiness = "tight";
    freeMessage = `You'll be ${freeGap} questions short of the recommended ${questionsNeeded}. That's a risk on test day.`;
  } else {
    freeReadiness = "at-risk";
    freeMessage = `You'll hit the free limit ${Math.ceil(freeGap / DAILY_QUESTIONS_FREE)} days before your test — and still be ${freeGap} questions short.`;
  }

  // Premium path
  const premiumTotalReachable = Math.min(
    PREMIUM_QUESTIONS_AVAILABLE,
    daysLeft * DAILY_QUESTIONS_PREMIUM
  );
  const premiumGap = questionsNeeded - premiumTotalReachable;
  let premiumReadiness: ReadinessLevel;
  let premiumMessage: string;
  if (premiumTotalReachable >= questionsNeeded) {
    premiumReadiness = "on-track";
    premiumMessage = `With ${daysLeft} days to go, you can hit ${Math.min(premiumTotalReachable, 300)} questions — well above the recommended ${questionsNeeded}.`;
  } else if (premiumGap <= 30) {
    premiumReadiness = "tight";
    premiumMessage = `Close — you'd reach ${premiumTotalReachable} of ${questionsNeeded} recommended. Study every day.`;
  } else {
    premiumReadiness = "at-risk";
    premiumMessage = `Very tight timeline — make every session count.`;
  }

  return {
    daysLeft,
    testDateFormatted: formatDate(testDate),
    stateName: state.name,
    stateQuestions: state.writtenTestQuestions,
    passingScore: state.passingScore,
    questionsNeeded,
    freeQuestionsPerDay: DAILY_QUESTIONS_FREE,
    freeTotalReachable,
    freeReadiness,
    freeMessage,
    premiumQuestionsPerDay: DAILY_QUESTIONS_PREMIUM,
    premiumTotalReachable,
    premiumReadiness,
    premiumMessage,
  };
}

const readinessColors: Record<ReadinessLevel, string> = {
  "on-track": "text-green-600",
  "tight": "text-amber-600",
  "at-risk": "text-red-600",
};

const readinessBg: Record<ReadinessLevel, string> = {
  "on-track": "bg-green-50 border-green-200",
  "tight": "bg-amber-50 border-amber-200",
  "at-risk": "bg-red-50 border-red-200",
};

const readinessIcon: Record<ReadinessLevel, React.ReactNode> = {
  "on-track": <CheckCircle2 className="w-5 h-5 text-green-600" />,
  "tight": <AlertTriangle className="w-5 h-5 text-amber-600" />,
  "at-risk": <AlertTriangle className="w-5 h-5 text-red-600" />,
};

const readinessLabel: Record<ReadinessLevel, string> = {
  "on-track": "On track",
  "tight": "Tight",
  "at-risk": "At risk",
};

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div
        className={`h-3 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function StudyPlanPage() {
  const router = useRouter();
  const [stateSlug, setStateSlug] = useState("california");
  const [testDate, setTestDate] = useState("");
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [step, setStep] = useState<"form" | "plan">("form");

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Max = 60 days out
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!testDate) return;
    const result = calcPlan(testDate, stateSlug);
    setPlan(result);
    setStep("plan");
  }

  function handleUpgrade() {
    router.push("/signup?ref=study-plan");
  }

  const sortedStates = [...states].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Image src="/tiger_face_01.png" alt="TigerTest" width={36} height={36} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Study Plan Calculator</h1>
            <p className="text-xs text-gray-500">Know exactly what you need to pass</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {step === "form" && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-2">
                <CalendarDays className="w-7 h-7 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When is your test?</h2>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Enter your real test date and we&apos;ll show you exactly how many questions
                you can cover — and whether you need to go premium to be ready in time.
              </p>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleGenerate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Your state
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                      value={stateSlug}
                      onChange={(e) => setStateSlug(e.target.value)}
                    >
                      {sortedStates.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Test date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                      value={testDate}
                      min={minDate}
                      max={maxDateStr}
                      onChange={(e) => setTestDate(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Up to 60 days from today</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base"
                    disabled={!testDate}
                  >
                    Build My Study Plan
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social proof — real */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span>701 students using TigerTest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>108 tests taken this week</span>
              </div>
            </div>
          </div>
        )}

        {step === "plan" && plan && (
          <div className="space-y-5">
            {/* Back */}
            <button
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              onClick={() => setStep("form")}
            >
              ← Change date
            </button>

            {/* Headline */}
            <div className="text-center space-y-1">
              <p className="text-sm text-gray-500">Your {plan.stateName} permit test</p>
              <h2 className="text-2xl font-bold text-gray-900">{plan.testDateFormatted}</h2>
              <Badge
                variant="secondary"
                className={`text-sm font-semibold ${
                  plan.daysLeft <= 3
                    ? "bg-red-100 text-red-700"
                    : plan.daysLeft <= 7
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {plan.daysLeft === 0
                  ? "Today!"
                  : plan.daysLeft === 1
                  ? "Tomorrow"
                  : `${plan.daysLeft} days away`}
              </Badge>
            </div>

            {/* Test stats */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {plan.stateName} Test Requirements
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{plan.stateQuestions}</p>
                    <p className="text-xs text-gray-500">real test questions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{plan.passingScore}%</p>
                    <p className="text-xs text-gray-500">passing score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{plan.questionsNeeded}</p>
                    <p className="text-xs text-gray-500">recommended practice Q&apos;s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Free plan */}
              <Card className={`border-2 shadow-sm ${readinessBg[plan.freeReadiness]}`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-700">Free plan</p>
                    <div className="flex items-center gap-1">
                      {readinessIcon[plan.freeReadiness]}
                      <span className={`text-xs font-semibold ${readinessColors[plan.freeReadiness]}`}>
                        {readinessLabel[plan.freeReadiness]}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Questions you can reach</span>
                      <span className="font-semibold">
                        {plan.freeTotalReachable} / {plan.questionsNeeded}
                      </span>
                    </div>
                    <ProgressBar
                      value={plan.freeTotalReachable}
                      max={plan.questionsNeeded}
                      color={
                        plan.freeReadiness === "on-track"
                          ? "bg-green-500"
                          : plan.freeReadiness === "tight"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }
                    />
                  </div>

                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      {plan.freeQuestionsPerDay} questions/day
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      3 practice tests
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400">Weak-spot flashcards locked</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400">Training sets 3 & 4 locked</span>
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500 italic">{plan.freeMessage}</p>
                </CardContent>
              </Card>

              {/* Premium plan */}
              <Card className={`border-2 shadow-sm relative ${readinessBg[plan.premiumReadiness]}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">Recommended</Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-700">Premium — $4.99</p>
                    <div className="flex items-center gap-1">
                      {readinessIcon[plan.premiumReadiness]}
                      <span className={`text-xs font-semibold ${readinessColors[plan.premiumReadiness]}`}>
                        {readinessLabel[plan.premiumReadiness]}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Questions you can reach</span>
                      <span className="font-semibold">
                        {plan.premiumTotalReachable} / {plan.questionsNeeded}
                      </span>
                    </div>
                    <ProgressBar
                      value={plan.premiumTotalReachable}
                      max={plan.questionsNeeded}
                      color={
                        plan.premiumReadiness === "on-track"
                          ? "bg-green-500"
                          : plan.premiumReadiness === "tight"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }
                    />
                  </div>

                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      {plan.premiumQuestionsPerDay} questions/day
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      Unlimited practice tests
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      Weak-spot flashcards unlocked
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      All 4 training sets
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500 italic">{plan.premiumMessage}</p>
                </CardContent>
              </Card>
            </div>

            {/* Daily schedule */}
            {plan.daysLeft > 0 && (
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    Your daily target (premium)
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-orange-600">{plan.premiumQuestionsPerDay}</p>
                      <p className="text-xs text-gray-500">questions/day</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-orange-600">~20</p>
                      <p className="text-xs text-gray-500">min/day</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-orange-600">{plan.daysLeft}</p>
                      <p className="text-xs text-gray-500">days left</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <div className="space-y-3">
              <Button
                onClick={handleUpgrade}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-base"
              >
                <Zap className="mr-2 w-5 h-5" />
                Go Premium — $4.99 one-time
              </Button>
              <p className="text-center text-xs text-gray-400">
                One-time payment · No subscription · Pass or your money back
              </p>
              <Button
                variant="ghost"
                className="w-full text-gray-500 text-sm"
                onClick={() => router.push("/test")}
              >
                Keep studying for free
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
