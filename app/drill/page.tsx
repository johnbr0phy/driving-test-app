"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Lock, CheckCircle, XCircle, Target, Zap, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { PaywallModal } from "@/components/PaywallModal";
import { getQuestionsData, shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackBeginCheckout, trackPaywallDismissed, trackPaywallHit } from "@/lib/analytics";

const CATEGORY_LABELS: Record<string, string> = {
  roadSigns: "Road Signs",
  rulesOfRoad: "Rules of the Road",
  safeDriving: "Safe Driving",
  speedLimits: "Speed Limits",
  alcoholDUI: "Alcohol & DUI",
  duiStateLaws: "DUI & State Laws",
  gdlLicensing: "Licensing & Permits",
  stateUnique: "State Laws",
  cellPhone: "Cell Phone Laws",
  insurance: "Insurance",
  specialSituations: "Special Situations",
  trafficLaws: "Traffic Laws",
  safetyLaws: "Safety Laws",
  safetyEquipment: "Safety Equipment",
  parking: "Parking",
  rightOfWay: "Right of Way",
  seatBelt: "Seat Belt Laws",
  seatbeltChild: "Child Seat Belt",
  seatbeltChildRestraint: "Child Restraints",
  seatbeltLaws: "Seat Belt Laws",
  schoolZone: "School Zones",
  weatherDriving: "Weather Driving",
  childSafety: "Child Safety",
  stateTrafficLaws: "State Traffic Laws",
};

const CATEGORY_EMOJI: Record<string, string> = {
  roadSigns: "🚦",
  rulesOfRoad: "📋",
  safeDriving: "🛡️",
  speedLimits: "⚡",
  alcoholDUI: "🍺",
  duiStateLaws: "⚖️",
  gdlLicensing: "📄",
  stateUnique: "🗺️",
  cellPhone: "📱",
  insurance: "💼",
  specialSituations: "⚠️",
  trafficLaws: "🚗",
  safetyLaws: "🔒",
  safetyEquipment: "🪖",
  parking: "🅿️",
  rightOfWay: "↔️",
  seatBelt: "🔐",
  seatbeltChild: "👶",
  seatbeltChildRestraint: "👶",
  seatbeltLaws: "🔐",
  schoolZone: "🏫",
  weatherDriving: "🌧️",
  childSafety: "👶",
  stateTrafficLaws: "🗺️",
};

type DrillPhase = "category-select" | "drilling" | "complete";

interface CategoryWeakness {
  category: string;
  label: string;
  emoji: string;
  accuracy: number;
  wrong: number;
  total: number;
}

interface DrillAnswer {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

export default function DrillPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { t, language } = useTranslation();
  const { user } = useAuth();

  const hasPremiumAccess = useStore((s) => s.hasPremiumAccess);
  const completedTests = useStore((s) => s.completedTests);
  const selectedState = useStore((s) => s.selectedState);

  const isPremium = hydrated ? hasPremiumAccess() : false;
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [phase, setPhase] = useState<DrillPhase>("category-select");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [drillAnswers, setDrillAnswers] = useState<DrillAnswer[]>([]);

  // Compute weak categories from all completed tests for selected state
  const weakCategories = useMemo<CategoryWeakness[]>(() => {
    if (!hydrated) return [];
    const stateTests = completedTests.filter((t) => t.state === (selectedState || "CA"));
    if (stateTests.length === 0) return [];

    const catStats: Record<string, { correct: number; wrong: number }> = {};
    stateTests.forEach((session) => {
      session.answers.forEach((answer, idx) => {
        const q = session.questions[idx];
        if (!q) return;
        const cat = q.category;
        if (!catStats[cat]) catStats[cat] = { correct: 0, wrong: 0 };
        if (answer.isCorrect) catStats[cat].correct++;
        else catStats[cat].wrong++;
      });
    });

    return Object.entries(catStats)
      .filter(([, s]) => s.wrong > 0 && s.correct + s.wrong >= 2)
      .map(([cat, s]) => ({
        category: cat,
        label: CATEGORY_LABELS[cat] || cat,
        emoji: CATEGORY_EMOJI[cat] || "📚",
        accuracy: Math.round((s.correct / (s.correct + s.wrong)) * 100),
        wrong: s.wrong,
        total: s.correct + s.wrong,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 6); // top 6 weakest
  }, [hydrated, completedTests, selectedState]);

  const freeCategories = weakCategories.slice(0, 2);
  const lockedCategories = weakCategories.slice(2);

  const startDrill = useCallback(
    (category: string, isLocked: boolean) => {
      if (isLocked && !isPremium) {
        trackPaywallHit("drill_category_locked", "Weak Spot Drills", "drill_page");
        setPaywallOpen(true);
        return;
      }

      // Pull questions for this category from question bank
      const allQs = getQuestionsData(language);
      const stateCode = selectedState || "CA";
      const catQs = allQs.filter(
        (q) =>
          q.category === category &&
          (q.state === "ALL" || q.state === stateCode)
      );

      // Shuffle and pick up to 10
      const shuffled = [...catQs].sort(() => Math.random() - 0.5).slice(0, 10);
      const prepared = shuffled.map(shuffleQuestionOptions);

      setSelectedCategory(category);
      setDrillQuestions(prepared);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setDrillAnswers([]);
      setPhase("drilling");
    },
    [isPremium, language, selectedState]
  );

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    const q = drillQuestions[currentIndex];
    const isCorrect = selectedAnswer === q.correctAnswer;
    const newAnswers = [
      ...drillAnswers,
      { question: q, userAnswer: selectedAnswer!, isCorrect },
    ];
    setDrillAnswers(newAnswers);

    if (currentIndex + 1 >= drillQuestions.length) {
      setPhase("complete");
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push("/signup");
      return;
    }
    trackBeginCheckout("drill_paywall");
    // Stripe checkout handled by PaywallModal
  };

  const currentQ = drillQuestions[currentIndex];
  const drillScore = drillAnswers.filter((a) => a.isCorrect).length;
  const drillPercentage =
    drillAnswers.length > 0
      ? Math.round((drillScore / drillAnswers.length) * 100)
      : 0;

  const categoryLabel = selectedCategory
    ? CATEGORY_LABELS[selectedCategory] || selectedCategory
    : "";
  const categoryEmoji = selectedCategory ? CATEGORY_EMOJI[selectedCategory] || "📚" : "📚";

  // ─── Render: No data state ───────────────────────────────────────────
  if (hydrated && completedTests.filter((t) => t.state === (selectedState || "CA")).length === 0) {
    return (
      <div className="flex-1 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="-ml-2 mb-6 text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Card className="text-center py-12">
            <CardContent>
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">No test data yet</h2>
              <p className="text-gray-500 mb-6">
                Complete at least one practice test to see your weak areas and start drilling.
              </p>
              <Link href="/dashboard">
                <Button className="bg-brand text-white hover:bg-brand-hover">
                  Take a Practice Test
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ─── Phase: Complete ─────────────────────────────────────────────────
  if (phase === "complete") {
    const passed = drillPercentage >= 70;
    return (
      <div className="flex-1 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{categoryEmoji}</div>
            <h1 className="text-3xl font-black mb-2">Drill Complete!</h1>
            <p className="text-gray-500">{categoryLabel}</p>
          </div>

          <Card
            className={`mb-6 ${passed ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light"}`}
          >
            <CardContent className="py-8 text-center">
              <div className={`text-7xl font-black mb-2 ${passed ? "text-green-600" : "text-brand"}`}>
                {drillPercentage}%
              </div>
              <div className="text-gray-600 mb-4">
                {drillScore} of {drillAnswers.length} correct
              </div>
              <Badge
                className={`text-sm px-4 py-1 ${passed ? "bg-green-600" : "bg-brand"}`}
              >
                {passed ? "💪 Improving!" : "📚 Keep drilling"}
              </Badge>
            </CardContent>
          </Card>

          {/* Per-question review */}
          <div className="space-y-3 mb-8">
            {drillAnswers.map((da, i) => (
              <Card key={i} className={da.isCorrect ? "border-green-200" : "border-red-200"}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    {da.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        {da.question.question}
                      </p>
                      {!da.isCorrect && (
                        <p className="text-xs text-green-700">
                          ✓ Correct: {da.question[`option${da.question.correctAnswer}` as keyof Question] as string}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-brand text-white hover:bg-brand-hover h-12 font-bold"
              onClick={() => startDrill(selectedCategory!, false)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Drill Again
            </Button>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setPhase("category-select")}
            >
              Choose Another Category
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Phase: Drilling ─────────────────────────────────────────────────
  if (phase === "drilling" && currentQ) {
    const options: Array<{ key: string; text: string }> = [
      { key: "A", text: currentQ.optionA },
      { key: "B", text: currentQ.optionB },
      { key: "C", text: currentQ.optionC },
      { key: "D", text: currentQ.optionD },
    ].filter((o) => o.text);

    const progress = ((currentIndex + (showResult ? 1 : 0)) / drillQuestions.length) * 100;

    return (
      <div className="flex-1 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPhase("category-select")}
              className="text-gray-600 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{categoryEmoji}</span>
                <span className="font-bold text-gray-800">{categoryLabel} Drill</span>
                <Badge variant="outline" className="text-xs ml-auto">
                  {currentIndex + 1} / {drillQuestions.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question */}
          <Card className="mb-4">
            <CardContent className="pt-6 pb-4">
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                {currentQ.question}
              </p>
            </CardContent>
          </Card>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {options.map(({ key, text }) => {
              const isSelected = selectedAnswer === key;
              const isCorrect = key === currentQ.correctAnswer;
              let className =
                "w-full text-left p-4 rounded-xl border-2 font-medium transition-all cursor-pointer text-sm leading-snug ";

              if (!showResult) {
                className += isSelected
                  ? "border-brand bg-brand-light text-brand-dark"
                  : "border-gray-200 bg-white hover:border-brand-border hover:bg-brand-light";
              } else {
                if (isCorrect) {
                  className += "border-green-500 bg-green-50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  className += "border-red-400 bg-red-50 text-red-700";
                } else {
                  className += "border-gray-200 bg-white text-gray-400";
                }
              }

              return (
                <button key={key} className={className} onClick={() => handleAnswer(key)}>
                  <span className="font-bold mr-2">{key}.</span>
                  {text}
                  {showResult && isCorrect && (
                    <CheckCircle className="h-4 w-4 text-green-500 inline ml-2" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-red-500 inline ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <Card className={`mb-6 ${selectedAnswer === currentQ.correctAnswer ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
              <CardContent className="py-4">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">
                    {selectedAnswer === currentQ.correctAnswer ? "✓ Correct! " : "✗ Not quite. "}
                  </span>
                  {currentQ.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {showResult && (
            <Button
              className="w-full bg-brand text-white hover:bg-brand-hover h-12 font-bold text-base"
              onClick={handleNext}
            >
              {currentIndex + 1 < drillQuestions.length ? "Next Question →" : "See Results"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ─── Phase: Category Select ──────────────────────────────────────────
  return (
    <div className="flex-1 bg-gray-50">
      <PaywallModal
        open={paywallOpen}
        onOpenChange={(open) => {
          if (open) trackPaywallHit("drill_paywall", "Weak Spot Drills", "drill_page");
          if (!open && paywallOpen) trackPaywallDismissed("drill_page");
          setPaywallOpen(open);
        }}
        feature="full_stats"
        onUpgrade={handleUpgrade}
        isGuest={!user}
        onSignUp={() => router.push("/signup")}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="-ml-2 mb-6 text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-2xl mb-4">
            <Target className="h-8 w-8 text-brand" />
          </div>
          <h1 className="text-3xl font-black mb-2">Weak Spot Drills</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Focused practice on your personal weak categories — the fastest way to pass your DMV test.
          </p>
        </div>

        {/* Free categories */}
        {freeCategories.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Your Weakest Areas (Free)
              </span>
            </div>
            <div className="space-y-3">
              {freeCategories.map((cat) => (
                <CategoryCard
                  key={cat.category}
                  cat={cat}
                  locked={false}
                  onStart={() => startDrill(cat.category, false)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Premium locked categories */}
        {lockedCategories.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                More Drills — Premium
              </span>
            </div>
            <div className="space-y-3">
              {lockedCategories.map((cat) => (
                <CategoryCard
                  key={cat.category}
                  cat={cat}
                  locked={!isPremium}
                  onStart={() => startDrill(cat.category, !isPremium)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Paywall CTA if not premium */}
        {!isPremium && lockedCategories.length > 0 && (
          <Card className="bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="py-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🔓</div>
                <h3 className="font-bold text-gray-900 mb-2">Unlock All {weakCategories.length} Weak-Spot Drills</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Premium gives you focused drills on every topic you&apos;re struggling with, plus unlimited practice tests and full stats.
                </p>
                <Button
                  className="bg-brand text-white hover:bg-brand-hover font-bold px-8"
                  onClick={() => {
                    trackPaywallHit("drill_upsell_card", "Weak Spot Drills", "drill_page");
                    setPaywallOpen(true);
                  }}
                >
                  Upgrade to Premium — $4.99
                </Button>
                <p className="text-xs text-gray-400 mt-2">One-time payment · Covers your whole test prep</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {weakCategories.length === 0 && hydrated && (
          <Card className="text-center py-10">
            <CardContent>
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No weak spots found!</h3>
              <p className="text-gray-500 text-sm">
                You&apos;re scoring well across all categories. Keep taking tests to track any new patterns.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function CategoryCard({
  cat,
  locked,
  onStart,
}: {
  cat: CategoryWeakness;
  locked: boolean;
  onStart: () => void;
}) {
  const accuracyColor =
    cat.accuracy < 50 ? "text-red-600" : cat.accuracy < 70 ? "text-yellow-600" : "text-green-600";
  const barColor =
    cat.accuracy < 50 ? "bg-red-500" : cat.accuracy < 70 ? "bg-yellow-500" : "bg-green-500";

  return (
    <Card className={`transition-all ${locked ? "opacity-75" : "hover:shadow-md cursor-pointer"}`}>
      <CardContent className="py-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl flex-shrink-0">{cat.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-800">{cat.label}</span>
              <span className={`text-sm font-bold ${accuracyColor}`}>{cat.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                className={`h-1.5 rounded-full ${barColor}`}
                style={{ width: `${cat.accuracy}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {cat.wrong} wrong of {cat.total} answered
            </span>
          </div>
          <div className="flex-shrink-0">
            {locked ? (
              <div className="flex items-center gap-1 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-lg text-sm font-medium">
                <Lock className="h-3.5 w-3.5" />
                <span>Premium</span>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-brand text-white hover:bg-brand-hover font-bold px-4"
                onClick={onStart}
              >
                Drill →
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
