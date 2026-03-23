"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Printer, Lock, ArrowLeft, BookOpen, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  general: "General Rules",
  speedLimits: "Speed Limits",
  duiBac: "DUI / BAC",
  gdlLicensing: "GDL & Licensing",
  insurance: "Insurance",
  seatbeltPhone: "Seatbelts & Phones",
  pointsPenalties: "Points & Penalties",
  stateUnique: "State-Specific Rules",
  vehicleInspection: "Vehicle Inspection",
  safeDriving: "Safe Driving",
  basicControl: "Basic Vehicle Control",
  cargoHandling: "Cargo Handling",
  emergencyProcedures: "Emergency Procedures",
  alcoholDrugs: "Alcohol & Drugs",
  nightDriving: "Night Driving",
  weatherDriving: "Weather Driving",
  mountainDriving: "Mountain Driving",
  railroadCrossings: "Railroad Crossings",
  hazardPerception: "Hazard Perception",
  brakingSystems: "Braking Systems",
  vehicleSystems: "Vehicle Systems",
};

function getCategoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] || cat;
}

interface WrongQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
  category: string;
  userAnswer: string;
}

interface CategoryGroup {
  category: string;
  questions: WrongQuestion[];
}

export default function CheatSheetPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { t } = useTranslation();

  const completedTests = useStore((state) => state.completedTests);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const isGuest = useStore((state) => state.isGuest);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (hydrated) {
      setIsPremium(hasPremiumAccess());
    }
  }, [hydrated, hasPremiumAccess]);

  // Collect all wrong answers across all completed tests
  const allWrong = useMemo<WrongQuestion[]>(() => {
    if (!hydrated || !completedTests.length) return [];
    const seen = new Set<string>();
    const wrong: WrongQuestion[] = [];
    for (const session of completedTests) {
      // Build a map from questionId to Question for this session
      const qMap: Record<string, (typeof session.questions)[0]> = {};
      for (const q of session.questions) {
        qMap[q.questionId] = q;
      }
      for (const ua of session.answers) {
        if (!ua.isCorrect && ua.questionId && !seen.has(ua.questionId)) {
          const q = qMap[ua.questionId];
          if (!q) continue;
          seen.add(ua.questionId);
          wrong.push({
            question: q.question,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            category: q.category,
            userAnswer: ua.userAnswer,
          });
        }
      }
    }
    return wrong;
  }, [hydrated, completedTests]);

  // Group by category
  const grouped = useMemo<CategoryGroup[]>(() => {
    const map: Record<string, WrongQuestion[]> = {};
    for (const q of allWrong) {
      if (!map[q.category]) map[q.category] = [];
      map[q.category].push(q);
    }
    return Object.entries(map)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([category, questions]) => ({ category, questions }));
  }, [allWrong]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading your study guide...</div>
      </div>
    );
  }

  // No test data at all
  if (completedTests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-16 h-16 text-brand mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No tests completed yet</h1>
        <p className="text-gray-600 mb-6">Take a practice test first — your personal study guide will appear here automatically.</p>
        <Link href="/dashboard">
          <Button className="bg-brand text-white hover:bg-brand-hover">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // All correct — nothing to review
  if (allWrong.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Perfect record!</h1>
        <p className="text-gray-600 mb-6">You haven&apos;t missed a question yet. Keep it up.</p>
        <Link href="/dashboard">
          <Button className="bg-brand text-white hover:bg-brand-hover">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const FREE_CATEGORY_LIMIT = 2;
  const visibleGroups = isPremium ? grouped : grouped.slice(0, FREE_CATEGORY_LIMIT);
  const lockedGroups = isPremium ? [] : grouped.slice(FREE_CATEGORY_LIMIT);

  const getOptionText = (q: WrongQuestion, letter: string) => {
    if (letter === "A") return q.optionA;
    if (letter === "B") return q.optionB;
    if (letter === "C") return q.optionC;
    if (letter === "D") return q.optionD;
    return "";
  };

  return (
    <>
      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { background: white !important; }
          .print-card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="no-print bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <h1 className="text-base font-bold text-gray-900">My Study Guide</h1>
          {isPremium ? (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1.5 border-gray-300"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          ) : (
            <div className="w-16" />
          )}
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6 text-center print-only">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My DMV Study Guide</h1>
            <p className="text-gray-500 text-sm">Generated by TigerTest • tigertest.io</p>
          </div>

          {/* Summary card */}
          <Card className="mb-6 print-card bg-brand-light border-brand-border-light">
            <CardContent className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-brand-dark font-medium mb-0.5">Questions to review</p>
                  <p className="text-3xl font-bold text-brand">{allWrong.length}</p>
                  <p className="text-xs text-gray-500 mt-0.5">across {grouped.length} topic{grouped.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-medium mb-0.5">Tests taken</p>
                  <p className="text-3xl font-bold text-gray-900">{completedTests.length}</p>
                  <p className="text-xs text-gray-500 mt-0.5">practice tests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visible groups */}
          {visibleGroups.map(({ category, questions }) => (
            <Card key={category} className="mb-4 print-card">
              <CardHeader
                className="py-4 cursor-pointer no-print"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base font-bold text-gray-900">
                      {getCategoryLabel(category)}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs font-semibold border-red-300 text-red-600 bg-red-50">
                      {questions.length} missed
                    </Badge>
                  </div>
                  {expandedCategories.has(category) ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>

              {/* Print always shows content; screen shows on expand */}
              <div className={expandedCategories.has(category) ? "block" : "hidden print:block"}>
                <CardContent className="pt-0 space-y-4">
                  {questions.map((q, qi) => (
                    <div key={qi} className="border-t border-gray-100 pt-4 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5 mb-3">
                        {["A", "B", "C", "D"].map((letter) => {
                          const text = getOptionText(q, letter);
                          const isCorrect = letter === q.correctAnswer;
                          const isUserWrong = letter === q.userAnswer && !isCorrect;
                          return (
                            <div
                              key={letter}
                              className={`flex items-start gap-2 text-sm px-3 py-2 rounded-md ${
                                isCorrect
                                  ? "bg-green-50 border border-green-200"
                                  : isUserWrong
                                  ? "bg-red-50 border border-red-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className={`font-bold shrink-0 ${isCorrect ? "text-green-700" : isUserWrong ? "text-red-600" : "text-gray-500"}`}>
                                {letter}.
                              </span>
                              <span className={isCorrect ? "text-green-800" : isUserWrong ? "text-red-700" : "text-gray-700"}>
                                {text}
                              </span>
                              {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto mt-0.5" />}
                              {isUserWrong && <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-auto mt-0.5" />}
                            </div>
                          );
                        })}
                      </div>
                      {q.explanation && (
                        <div className="bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
                          <p className="text-xs text-blue-800 leading-relaxed">
                            <span className="font-semibold">Why: </span>{q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </div>
            </Card>
          ))}

          {/* Locked groups (free users) */}
          {lockedGroups.length > 0 && (
            <div className="no-print">
              <div className="relative">
                {/* Blurred preview */}
                {lockedGroups.slice(0, 2).map(({ category, questions }) => (
                  <Card key={category} className="mb-4 opacity-40 pointer-events-none select-none blur-[2px]">
                    <CardHeader className="py-4">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base font-bold text-gray-900">
                          {getCategoryLabel(category)}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs font-semibold border-red-300 text-red-600 bg-red-50">
                          {questions.length} missed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {questions.slice(0, 2).map((q, qi) => (
                          <div key={qi} className="border-t border-gray-100 pt-3 first:border-0 first:pt-0">
                            <p className="text-sm font-semibold text-gray-900">{q.question}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Upgrade overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-white/80 to-white rounded-xl">
                  <div className="text-center p-6 max-w-sm">
                    <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-7 h-7 text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {lockedGroups.length} more topic{lockedGroups.length !== 1 ? "s" : ""} locked
                    </h3>
                    <p className="text-sm text-gray-600 mb-5">
                      Go Premium to unlock your full study guide — every missed question, explained, printable.
                    </p>
                    <Link href="/dashboard">
                      <Button className="w-full bg-brand text-white hover:bg-brand-hover font-bold py-3 text-base">
                        Unlock Full Guide — $4.99
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-400 mt-3">One-time payment. No subscription.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Print CTA for free users */}
          {!isPremium && allWrong.length > 0 && (
            <Card className="no-print mb-6 border-brand-border-light bg-gradient-to-r from-brand-light to-brand-gradient-to">
              <CardContent className="py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                    <Printer className="w-5 h-5 text-brand" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Print your study guide</p>
                    <p className="text-xs text-gray-600 mt-0.5">Premium members can print or save as PDF for offline studying.</p>
                  </div>
                  <Link href="/dashboard">
                    <Button size="sm" className="bg-brand text-white hover:bg-brand-hover shrink-0">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <p className="no-print text-center text-xs text-gray-400 mt-4">
            Study guide updates automatically as you take more tests.
          </p>
        </div>
      </div>
    </>
  );
}
