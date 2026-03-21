"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Swords, Trophy, Lock, ArrowRight, Target, CheckCircle2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { generateTest, shuffleQuestionOptions } from "@/lib/testGenerator";
import { QuestionCard } from "@/components/QuestionCard";
import { PaywallModal } from "@/components/PaywallModal";
import { useAuth } from "@/contexts/AuthContext";
import { states } from "@/data/states";
import { Question } from "@/types";

// --- Types ---
interface ChallengePayload {
  n: string;   // challenger first name
  s: number;   // their score
  t: number;   // total questions
  p: number;   // percentage
  st: string;  // state code
  id: number;  // test id
  ok: number;  // 0=failed, 1=passed
}

// --- Helper: decode challenge param ---
function decodeChallenge(raw: string): ChallengePayload | null {
  try {
    return JSON.parse(decodeURIComponent(atob(raw)));
  } catch {
    return null;
  }
}

// --- Tiger face helper ---
function getTigerFace(pct: number) {
  if (pct >= 100) return "/tiger_face_01.png";
  if (pct >= 85) return "/tiger_face_02.png";
  if (pct >= 70) return "/tiger_face_03.png";
  if (pct >= 55) return "/tiger_face_04.png";
  if (pct >= 40) return "/tiger_face_05.png";
  if (pct >= 25) return "/tiger_face_06.png";
  if (pct >= 10) return "/tiger_face_07.png";
  return "/tiger_face_08.png";
}

// ===========================
// INNER COMPONENT (uses useSearchParams)
// ===========================
function ChallengeInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();

  const hasPremiumAccess = useStore((s) => s.hasPremiumAccess);
  const isPremium = hydrated ? hasPremiumAccess() : false;

  // Challenge state machine
  type Phase = "intro" | "quiz" | "results";
  const [phase, setPhase] = useState<Phase>("intro");
  const [challenge, setChallenge] = useState<ChallengePayload | null>(null);
  const [decodeError, setDecodeError] = useState(false);
  const [stateName, setStateName] = useState("your state");

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [k: number]: string }>({});

  // Paywall
  const [paywallOpen, setPaywallOpen] = useState(false);

  // ---- Parse challenge param on mount ----
  useEffect(() => {
    const raw = searchParams.get("c");
    if (!raw) { setDecodeError(true); return; }
    const parsed = decodeChallenge(raw);
    if (!parsed) { setDecodeError(true); return; }
    setChallenge(parsed);

    // Resolve state name
    const st = states.find((s) => s.code === parsed.st);
    if (st) setStateName(st.name);

    // Pre-load questions (same count as challenger's test, test slot 1)
    const qs = generateTest(parsed.id || 1, parsed.st, "en");
    const sliced = qs.slice(0, parsed.t).map(shuffleQuestionOptions);
    setQuestions(sliced as Question[]);
  }, [searchParams]);

  // ---- Derived quiz progress ----
  const progressPct = questions.length ? Math.round((currentIdx / questions.length) * 100) : 0;

  // ---- My results ----
  const myScore = questions.filter(
    (q, idx) => answers[idx] === q.correctAnswer
  ).length;
  const myPct = questions.length ? Math.round((myScore / questions.length) * 100) : 0;
  const myPassed = myPct >= 70;

  // ---- Handle answer selection ----
  const handleAnswer = (answer: string) => {
    const next = { ...answers, [currentIdx]: answer };
    setAnswers(next);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setPhase("results");
    }
  };

  // ---- Premium upgrade stub ----
  const handleUpgrade = async () => {
    router.push("/dashboard");
  };

  // ===== RENDER: decode error =====
  if (decodeError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <Image src="/tiger_face_06.png" alt="Tiger" width={80} height={80} className="mb-4 opacity-40" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Invalid challenge link</h2>
        <p className="text-gray-500 mb-6">This link may have expired or been modified.</p>
        <Link href="/">
          <Button>Go to TigerTest</Button>
        </Link>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading challenge…</div>
      </div>
    );
  }

  // ===== RENDER: INTRO =====
  if (phase === "intro") {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-950 to-orange-950 min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-12 text-center">
          {/* Header */}
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-6 font-bold">tigertest.io</div>

          <div className="flex justify-center gap-6 items-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <Image src={getTigerFace(challenge.p)} alt="Challenger" width={80} height={80} />
              <span className="text-orange-300 text-sm font-bold">{challenge.n}</span>
            </div>
            <Swords className="h-10 w-10 text-orange-400" />
            <div className="flex flex-col items-center gap-2">
              <Image src="/tiger_face_03.png" alt="You" width={80} height={80} className="opacity-40 grayscale" />
              <span className="text-gray-500 text-sm font-bold">You</span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-2 leading-tight">
            {challenge.n} challenged you!
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            They scored{" "}
            <span className={`font-black text-2xl ${challenge.ok ? "text-green-400" : "text-orange-400"}`}>
              {challenge.p}%
            </span>{" "}
            on the {stateName} permit test.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            {challenge.s}/{challenge.t} correct · {challenge.ok ? "✅ Passed" : "❌ Failed"}
          </p>

          {/* CTA */}
          <div className="bg-white/10 rounded-2xl p-6 mb-6 text-left">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-400" />
              Your challenge
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Same {challenge.t} questions from the {stateName} DMV question bank
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Beat {challenge.n}&apos;s score to win the challenge
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Free · no account needed to play
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-lg uppercase tracking-wide h-14"
            onClick={() => setPhase("quiz")}
          >
            Accept the challenge <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-gray-600 text-xs mt-4">
            Already practice on TigerTest?{" "}
            <Link href="/dashboard" className="text-orange-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ===== RENDER: QUIZ =====
  if (phase === "quiz") {
    const currentQ = questions[currentIdx];
    if (!currentQ) return null;

    return (
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Challenge context bar */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center justify-between mb-6">
            <span className="text-orange-700 text-sm font-bold flex items-center gap-2">
              <Swords className="h-4 w-4" />
              Beating {challenge.n}&apos;s {challenge.p}%
            </span>
            <span className="text-orange-500 text-sm">
              {currentIdx + 1}/{questions.length}
            </span>
          </div>

          {/* Progress */}
          <Progress value={progressPct} className="mb-6 h-2" />

          {/* Question */}
          <QuestionCard
            question={currentQ}
            selectedAnswer={answers[currentIdx] || undefined}
            onAnswerChange={handleAnswer}
            showResult={false}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  // ===== RENDER: RESULTS =====
  const iWon = myPct > challenge.p;
  const isTied = myPct === challenge.p;

  // Per-question breakdown — gated by premium
  const breakdown = questions.map((q, idx) => ({
    question: q.question,
    correct: q.correctAnswer,
    myAnswer: answers[idx] || "–",
    isCorrect: answers[idx] === q.correctAnswer,
  }));

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Hero results banner */}
      <div
        className={`py-10 text-center px-4 ${
          iWon
            ? "bg-gradient-to-b from-gray-950 to-green-950"
            : isTied
            ? "bg-gradient-to-b from-gray-950 to-amber-950"
            : "bg-gradient-to-b from-gray-950 to-brand-darker"
        }`}
      >
        <div className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-bold">tigertest.io</div>
        <div className="text-2xl font-black text-white mb-6">
          {iWon ? "🏆 You beat the challenge!" : isTied ? "🤝 It's a tie!" : "😬 Challenge failed"}
        </div>

        {/* Head-to-head scoreboard */}
        <div className="max-w-sm mx-auto grid grid-cols-2 gap-4 mb-8">
          {/* Challenger */}
          <Card className="bg-white/10 border-white/20">
            <CardContent className="pt-4 pb-4 text-center">
              <Image
                src={getTigerFace(challenge.p)}
                alt={challenge.n}
                width={60}
                height={60}
                className="mx-auto mb-2"
              />
              <div className="text-gray-300 text-xs mb-1 font-semibold">{challenge.n}</div>
              <div className={`text-3xl font-black ${challenge.ok ? "text-green-400" : "text-orange-400"}`}>
                {challenge.p}%
              </div>
              <Badge
                className={`mt-1 text-xs ${challenge.ok ? "bg-green-700" : "bg-orange-700"}`}
              >
                {challenge.ok ? "Passed" : "Failed"}
              </Badge>
            </CardContent>
          </Card>

          {/* Me */}
          <Card className={`border-2 ${iWon ? "border-green-400 bg-green-950/40" : "bg-white/10 border-white/20"}`}>
            <CardContent className="pt-4 pb-4 text-center">
              <Image
                src={getTigerFace(myPct)}
                alt="You"
                width={60}
                height={60}
                className="mx-auto mb-2"
              />
              <div className="text-gray-300 text-xs mb-1 font-semibold">You</div>
              <div className={`text-3xl font-black ${myPassed ? "text-green-400" : "text-orange-400"}`}>
                {myPct}%
              </div>
              <Badge className={`mt-1 text-xs ${myPassed ? "bg-green-700" : "bg-orange-700"}`}>
                {myPassed ? "Passed" : "Failed"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="max-w-xs mx-auto space-y-3">
          <Link href="/signup">
            <Button className="w-full bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wide h-12">
              Track your progress — sign up free
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/10 h-10 text-sm">
              Practice more on TigerTest
            </Button>
          </Link>
        </div>
      </div>

      {/* Question-by-question breakdown */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Question breakdown</h2>
          {!isPremium && (
            <Badge className="bg-brand text-white text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {isPremium ? (
          // Full breakdown for premium users
          <div className="space-y-3">
            {breakdown.map((item, idx) => (
              <Card
                key={idx}
                className={`border ${item.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        item.isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium mb-2">{item.question}</p>
                      {!item.isCorrect && (
                        <div className="space-y-1 text-xs">
                          <div className="text-red-600">
                            Your answer: {item.myAnswer}
                          </div>
                          <div className="text-green-700 font-semibold">
                            Correct: {item.correct}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Blurred teaser + paywall for free users
          <div className="relative">
            {/* First 3 questions visible */}
            <div className="space-y-3">
              {breakdown.slice(0, 3).map((item, idx) => (
                <Card
                  key={idx}
                  className={`border ${item.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          item.isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium mb-1">{item.question}</p>
                        {!item.isCorrect && (
                          <p className="text-xs text-green-700 font-semibold">Correct: {item.correct}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Blurred remaining */}
            <div className="blur-sm pointer-events-none select-none space-y-3 mt-3">
              {breakdown.slice(3, 7).map((item, idx) => (
                <Card key={idx} className="border border-gray-200">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                        {idx + 4}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-400">{item.question}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Paywall overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-24 pb-6 text-center px-4">
              <Trophy className="h-8 w-8 text-brand mx-auto mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">See every question you missed</h3>
              <p className="text-gray-500 text-sm mb-4">
                Unlock the full breakdown, plus unlimited practice tests and training sets — to actually beat the DMV.
              </p>
              <Button
                className="bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wide px-8"
                onClick={() => setPaywallOpen(true)}
              >
                Unlock full breakdown — $4.99
              </Button>
            </div>
          </div>
        )}
      </div>

      <PaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        feature="full_stats"
        onUpgrade={handleUpgrade}
        isGuest={!user}
        onSignUp={() => router.push("/signup")}
      />
    </div>
  );
}

// ===========================
// PAGE EXPORT (wrapped in Suspense for useSearchParams)
// ===========================
export default function ChallengePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400 text-sm">Loading challenge…</div>
        </div>
      }
    >
      <ChallengeInner />
    </Suspense>
  );
}
