"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, ChevronRight, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: "studied",
    question: "How much have you studied for your permit test so far?",
    answers: [
      { label: "Haven't started yet", value: 0 },
      { label: "Read the handbook once", value: 1 },
      { label: "Done some practice questions", value: 2 },
      { label: "Done lots of practice tests", value: 3 },
    ],
  },
  {
    id: "test_date",
    question: "When are you planning to take your test?",
    answers: [
      { label: "Today or tomorrow", value: 0 },
      { label: "This week", value: 1 },
      { label: "Within a month", value: 2 },
      { label: "No set date yet", value: 3 },
    ],
  },
  {
    id: "confidence",
    question: "How confident do you feel about passing right now?",
    answers: [
      { label: "Not confident at all", value: 0 },
      { label: "A little nervous", value: 1 },
      { label: "Pretty confident", value: 2 },
      { label: "Very confident — just want to double-check", value: 3 },
    ],
  },
];

type Answers = Record<string, number>;

function calcScore(answers: Answers): number {
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  return Math.round((total / 9) * 100);
}

interface ReadinessResult {
  score: number;
  label: string;
  color: string;
  bg: string;
  icon: "check" | "warn" | "x";
  headline: string;
  detail: string;
  cta: string;
}

function getResult(answers: Answers): ReadinessResult {
  const score = calcScore(answers);
  const studyLevel = answers.studied ?? 0;
  const testDate = answers.test_date ?? 3;
  const confidence = answers.confidence ?? 0;

  // Urgent: test soon + low prep
  if (testDate <= 1 && studyLevel <= 1) {
    return {
      score,
      label: "High Risk",
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      icon: "x",
      headline: "You're at high risk of failing",
      detail:
        "Your test is coming up fast and you haven't had much practice yet. Most states require a score of 80%+ to pass. Premium gives you unlimited tests across all topics — the fastest way to close the gap before your test date.",
      cta: "Unlock unlimited practice — $9 one-time",
    };
  }

  // Moderate risk: some study but gaps or low confidence
  if (score < 55 || (studyLevel <= 1 && confidence <= 1)) {
    return {
      score,
      label: "Needs Work",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      icon: "warn",
      headline: "You're on the right track but there are gaps",
      detail:
        "You've made a start, but there are likely topic areas where you'd get caught out in the real test. Premium unlocks four full question sets per state + detailed wrong-answer analytics to target exactly where you're weak.",
      cta: "Fill the gaps with Premium — $9 one-time",
    };
  }

  // Looking good: solid prep, time to spare
  return {
    score,
    label: "Looking Good",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: "check",
    headline: "You're well prepared — now lock it in",
    detail:
      "Your study habits are solid. To make sure you don't get surprised on test day, Premium gives you four full question sets and a wrong-answer tracker so you can nail every edge case and walk in with real confidence.",
    cta: "Lock in your pass with Premium — $9 one-time",
  };
}

function ScoreIcon({ icon }: { icon: ReadinessResult["icon"] }) {
  if (icon === "check") return <CheckCircle className="w-12 h-12 text-green-500" />;
  if (icon === "warn") return <AlertCircle className="w-12 h-12 text-amber-500" />;
  return <XCircle className="w-12 h-12 text-red-500" />;
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const strokeColor =
    color.includes("red") ? "#ef4444" : color.includes("amber") ? "#f59e0b" : "#22c55e";

  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="mx-auto">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle
        cx="65"
        cy="65"
        r={r}
        fill="none"
        stroke={strokeColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="65" y="60" textAnchor="middle" className="fill-gray-900" style={{ fontSize: 28, fontWeight: 700, fontFamily: "inherit" }}>
        {score}%
      </text>
      <text x="65" y="80" textAnchor="middle" className="fill-gray-500" style={{ fontSize: 12, fontFamily: "inherit" }}>
        readiness
      </text>
    </svg>
  );
}

export default function ReadinessQuizPage() {
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<number | null>(null);

  const question = QUESTIONS[currentQ];
  const isLast = currentQ === QUESTIONS.length - 1;

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      setStep("result");
    } else {
      setCurrentQ((q) => q + 1);
    }
  };

  const handleReset = () => {
    setStep("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
  };

  const progress = ((currentQ + (step === "result" ? 1 : 0)) / QUESTIONS.length) * 100;
  const result = step === "result" ? getResult(answers) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block mb-4">
          <Image src="/tiger.png" alt="TigerTest" width={48} height={48} className="mx-auto" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Am I Ready?</h1>
        <p className="text-gray-500 text-sm mt-1">
          3 quick questions — get your personalised readiness score
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg mb-6">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${step === "result" ? 100 : progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">
          {step === "result" ? "Done" : `Question ${currentQ + 1} of ${QUESTIONS.length}`}
        </p>
      </div>

      {step === "quiz" && (
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-lg font-semibold text-gray-900 mb-6">{question.question}</p>
          <div className="space-y-3">
            {question.answers.map((a) => (
              <button
                key={a.value}
                onClick={() => handleSelect(a.value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                  selected === a.value
                    ? "bg-blue-50 border-blue-400 text-blue-700 ring-2 ring-blue-200"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={selected === null}
            className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-5 text-sm font-semibold disabled:opacity-40"
          >
            {isLast ? "See my results" : "Next"} <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      )}

      {step === "result" && result && (
        <div className="w-full max-w-lg space-y-4">
          {/* Score card */}
          <div className={`rounded-2xl border p-6 text-center ${result.bg}`}>
            <ScoreRing score={result.score} color={result.color} />
            <div className={`mt-2 text-sm font-bold uppercase tracking-wide ${result.color}`}>
              {result.label}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-3">{result.headline}</h2>
          </div>

          {/* Detail card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-gray-600 leading-relaxed">{result.detail}</p>

            <div className="mt-5 space-y-3">
              <Link href="/signup">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold text-sm">
                  {result.cta}
                </Button>
              </Link>
              <Link href="/onboarding/select-state">
                <Button variant="outline" className="w-full rounded-xl py-5 text-sm font-medium text-gray-600">
                  Try 2 free practice tests first
                </Button>
              </Link>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              One-time payment · No subscription · Works on any device
            </p>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-3">
              What Premium includes
            </p>
            <ul className="space-y-2.5">
              {[
                "4 full practice test sets (vs 2 free)",
                "Wrong-answer tracker — drill your weak spots",
                "Detailed analytics to see exactly where you need work",
                "4 training topic sets with instant explanations",
                "Works for all 50 US states",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 fill-green-50 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mx-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}
