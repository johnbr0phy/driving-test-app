"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowUpDown, CheckCircle, XCircle, HelpCircle, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { Question } from "@/types";
import { getCDLQuestionsData } from "@/lib/cdlTestGenerator";

type SortField = "question" | "timesAnswered" | "correct" | "wrong" | "accuracy";
type SortDirection = "asc" | "desc";

interface QuestionWithPerformance {
  question: Question;
  timesAnswered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

// CDL category to training set number mapping (1-12)
const CDL_CATEGORY_TO_SET: { [key: string]: number } = {
  vehicleInspection: 1,
  vehicleSystems: 2,
  basicControl: 3,
  safeDriving: 4,
  brakingSystems: 5,
  hazardPerception: 6,
  emergencyProcedures: 7,
  cargoHandling: 8,
  mountainDriving: 9,
  weatherDriving: 10,
  nightDriving: 11,
  railroadCrossings: 12,
  alcoholDrugs: 4,
};

export default function CDLStatsPage() {
  const router = useRouter();
  const hydrated = useHydration();

  const isGuest = useStore((state) => state.isGuest);
  const getCDLPassProbability = useStore((state) => state.getCDLPassProbability);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const completedTests = useStore((state) => state.completedTests);
  const trainingAnswerHistory = useStore((state) => state.trainingAnswerHistory);

  const { user } = useAuth();

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const passProbability = hydrated ? getCDLPassProbability() : 0;

  // All hooks must be called before any early returns (React Rules of Hooks)
  const cdlQuestions = useMemo(() => getCDLQuestionsData(), []);

  // Build CDL question performance from store data
  const questionsWithPerformance = useMemo((): QuestionWithPerformance[] => {
    if (!hydrated) return [];

    const performanceMap: { [questionId: string]: { correct: number; wrong: number } } = {};

    // Include CDL practice test answers (state === 'CDL')
    const cdlTests = completedTests.filter((t) => t.state === "CDL");
    for (const test of cdlTests) {
      for (const answer of test.answers) {
        if (!performanceMap[answer.questionId]) {
          performanceMap[answer.questionId] = { correct: 0, wrong: 0 };
        }
        if (answer.isCorrect) {
          performanceMap[answer.questionId].correct++;
        } else {
          performanceMap[answer.questionId].wrong++;
        }
      }
    }

    // Include CDL training answers (questionId starts with "CDL-")
    for (const answer of trainingAnswerHistory) {
      if (!answer.questionId.startsWith("CDL-")) continue;
      if (!performanceMap[answer.questionId]) {
        performanceMap[answer.questionId] = { correct: 0, wrong: 0 };
      }
      if (answer.isCorrect) {
        performanceMap[answer.questionId].correct++;
      } else {
        performanceMap[answer.questionId].wrong++;
      }
    }

    return cdlQuestions.map((question) => {
      const perf = performanceMap[question.questionId];
      const correct = perf?.correct || 0;
      const wrong = perf?.wrong || 0;
      const timesAnswered = correct + wrong;
      return {
        question,
        timesAnswered,
        correct,
        wrong,
        accuracy: timesAnswered > 0 ? Math.round((correct / timesAnswered) * 100) : 0,
      };
    });
  }, [cdlQuestions, completedTests, trainingAnswerHistory, hydrated]);

  // Sort questions
  const sortedQuestions = useMemo(() => {
    return [...questionsWithPerformance].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "question":
          comparison = a.question.question.localeCompare(b.question.question);
          break;
        case "timesAnswered":
          comparison = a.timesAnswered - b.timesAnswered;
          break;
        case "correct":
          comparison = a.correct - b.correct;
          break;
        case "wrong":
          comparison = a.wrong - b.wrong;
          break;
        case "accuracy":
          comparison = a.accuracy - b.accuracy;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [questionsWithPerformance, sortField, sortDirection]);

  // Smart CTA recommendation for CDL
  const getRecommendation = useMemo(() => {
    if (!hydrated) return null;

    // Check CDL training set progress (sets 1-12 → IDs 101-112)
    const trainingProgress = Array.from({ length: 12 }, (_, i) => ({
      setNum: i + 1,
      cdlId: 101 + i,
      progress: getTrainingSetProgress(101 + i),
    }));

    const unstartedSet = trainingProgress.find((tp) => tp.progress.correct === 0);
    if (unstartedSet) {
      return {
        title: `Start CDL Training Set ${unstartedSet.setNum}`,
        description: "Complete all training sets to master the material",
        href: `/cdl/training?set=${unstartedSet.setNum}`,
      };
    }

    const incompleteSet = trainingProgress.find(
      (tp) => tp.progress.correct < (tp.progress.total || 50)
    );
    if (incompleteSet) {
      const total = incompleteSet.progress.total || 50;
      const pct = Math.round((incompleteSet.progress.correct / total) * 100);
      return {
        title: `Finish CDL Training Set ${incompleteSet.setNum}`,
        description: `${pct}% complete — ${total - incompleteSet.progress.correct} questions left`,
        href: `/cdl/training?set=${incompleteSet.setNum}`,
      };
    }

    if (passProbability >= 80) {
      return {
        title: "You're ready! 🎉",
        description: "Take a CDL practice test to confirm your readiness",
        href: "/cdl/dashboard",
      };
    }

    // Check test attempts
    const testStats = Array.from({ length: 12 }, (_, i) => getTestAttemptStats(101 + i));
    const hasAnyTests = testStats.some((s) => s && s.attemptCount > 0);
    if (!hasAnyTests) {
      return {
        title: "Take CDL Practice Test 1",
        description: "See where you stand before continuing to study",
        href: "/cdl/test/101",
      };
    }

    // Find worst performing category
    const categoryStats: { [key: string]: { correct: number; wrong: number } } = {};
    questionsWithPerformance.forEach((q) => {
      const category = q.question.category;
      if (!categoryStats[category]) categoryStats[category] = { correct: 0, wrong: 0 };
      categoryStats[category].correct += q.correct;
      categoryStats[category].wrong += q.wrong;
    });

    let worstCategory = "";
    let worstAccuracy = 100;
    let worstWrongCount = 0;
    Object.entries(categoryStats).forEach(([category, stats]) => {
      const total = stats.correct + stats.wrong;
      if (total > 0) {
        const accuracy = (stats.correct / total) * 100;
        if (stats.wrong > 0 && (accuracy < worstAccuracy || (accuracy === worstAccuracy && stats.wrong > worstWrongCount))) {
          worstAccuracy = accuracy;
          worstCategory = category;
          worstWrongCount = stats.wrong;
        }
      }
    });

    if (worstCategory && worstWrongCount > 0) {
      const setNumber = CDL_CATEGORY_TO_SET[worstCategory] || 1;
      const wrongPercent = Math.round(100 - worstAccuracy);
      const categoryLabel = worstCategory.replace(/([A-Z])/g, " $1").trim();
      return {
        title: `Practice CDL Training Set ${setNumber}`,
        description: `You're getting ${wrongPercent}% wrong on ${categoryLabel.toLowerCase()} questions`,
        href: `/cdl/training?set=${setNumber}`,
      };
    }

    return {
      title: "Keep practicing!",
      description: "Continue training to improve your CDL pass probability",
      href: "/cdl/dashboard",
    };
  }, [hydrated, questionsWithPerformance, passProbability, getTestAttemptStats, getTrainingSetProgress]);

  // Redirect guests to signup (after all hooks)
  if (hydrated && isGuest) {
    router.push("/signup");
    return null;
  }

  // Get tiger face image based on percentage
  const getTigerFace = (percentage: number): string => {
    if (percentage >= 100) return "/tiger_face_01.png";
    if (percentage >= 85) return "/tiger_face_02.png";
    if (percentage >= 70) return "/tiger_face_03.png";
    if (percentage >= 55) return "/tiger_face_04.png";
    if (percentage >= 40) return "/tiger_face_05.png";
    if (percentage >= 25) return "/tiger_face_06.png";
    if (percentage >= 10) return "/tiger_face_07.png";
    return "/tiger_face_08.png";
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 font-semibold hover:text-brand transition-colors"
    >
      {children}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? "text-brand" : "text-gray-400"}`} />
    </button>
  );

  const StatusIcon = ({ item }: { item: QuestionWithPerformance }) => {
    if (item.timesAnswered === 0) return <HelpCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />;
    if (item.accuracy === 100) return <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />;
    if (item.accuracy === 0) return <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />;
    return <div className="h-5 w-5 rounded-full border-2 border-yellow-500 flex-shrink-0" />;
  };

  if (!hydrated || isGuest) return null;

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <Link href="/cdl/dashboard">
            <Button variant="ghost" className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              CDL Dashboard
            </Button>
          </Link>
        </div>

        {/* Pass Probability Card */}
        <Card className={`mb-6 ${
          passProbability === 0
            ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
            : passProbability >= 80
              ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
              : passProbability >= 60
                ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200"
                : passProbability >= 40
                  ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
                  : passProbability >= 20
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                    : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {passProbability === 0 ? (
                <span className="text-4xl">❓</span>
              ) : (
                <Image
                  src={getTigerFace(passProbability)}
                  alt="Tiger mascot"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              )}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {passProbability === 0
                    ? "No CDL data yet"
                    : passProbability > 50
                      ? `${passProbability}% chance of passing CDL test`
                      : `${100 - passProbability}% chance of failing CDL test`
                  }
                </h1>
                {passProbability > 0 && (
                  <Progress
                    value={passProbability}
                    className={`h-2 mt-3 ${
                      passProbability >= 80
                        ? "[&>div]:bg-emerald-500"
                        : passProbability >= 60
                          ? "[&>div]:bg-lime-500"
                          : passProbability >= 40
                            ? "[&>div]:bg-amber-500"
                            : passProbability >= 20
                              ? "[&>div]:bg-orange-500"
                              : "[&>div]:bg-red-500"
                    }`}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart CTA */}
        {getRecommendation && (
          <Link href={getRecommendation.href} className="block">
            <Card className="mb-6 border-brand-border-light bg-brand-light cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">{getRecommendation.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{getRecommendation.description}</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-brand-muted flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Mobile Sort Controls */}
        <div className="md:hidden flex items-center gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { field: "timesAnswered" as SortField, label: "Answered" },
            { field: "correct" as SortField, label: "Correct" },
            { field: "wrong" as SortField, label: "Wrong" },
            { field: "accuracy" as SortField, label: "Accuracy" },
          ].map(({ field, label }) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors ${
                sortField === field
                  ? "bg-brand-light border-brand-border text-brand-dark font-medium"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {label}
              {sortField === field && (
                <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {sortedQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No CDL questions available
              </CardContent>
            </Card>
          ) : (
            sortedQuestions.map((item) => (
              <Card
                key={item.question.questionId}
                className="overflow-hidden cursor-pointer"
                onClick={() => setExpandedQuestionId(
                  expandedQuestionId === item.question.questionId ? null : item.question.questionId
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <StatusIcon item={item} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{item.question.question}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {item.question.category.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                    </div>
                  </div>
                  {expandedQuestionId === item.question.questionId && (
                    <div className="mb-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Answers</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null); }}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      {["A", "B", "C", "D"].map((letter) => {
                        const optionKey = `option${letter}` as keyof Question;
                        const optionText = item.question[optionKey] as string;
                        const isCorrect = item.question.correctAnswer === letter;
                        return (
                          <div
                            key={letter}
                            className={`flex items-start gap-2 p-2 rounded text-sm ${
                              isCorrect
                                ? "bg-green-50 border border-green-200"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-gray-500"}`}>
                              {letter}.
                            </span>
                            <span className={isCorrect ? "text-green-700" : "text-gray-600"}>
                              {optionText}
                            </span>
                            {isCorrect && (
                              <CheckCircle className="h-4 w-4 text-green-600 ml-auto flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                    <div className="text-center">
                      <div className={`font-semibold ${item.timesAnswered > 0 ? "text-gray-900" : "text-gray-400"}`}>
                        {item.timesAnswered}
                      </div>
                      <div className="text-xs text-gray-500">Answered</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-semibold ${item.correct > 0 ? "text-green-600" : "text-gray-400"}`}>
                        {item.correct}
                      </div>
                      <div className="text-xs text-gray-500">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-semibold ${item.wrong > 0 ? "text-red-600" : "text-gray-400"}`}>
                        {item.wrong}
                      </div>
                      <div className="text-xs text-gray-500">Wrong</div>
                    </div>
                    <div className="text-center">
                      {item.timesAnswered > 0 ? (
                        <div className={`font-semibold ${
                          item.accuracy === 100 ? "text-green-600" : item.accuracy >= 50 ? "text-yellow-600" : "text-red-600"
                        }`}>
                          {item.accuracy}%
                        </div>
                      ) : (
                        <div className="font-semibold text-gray-400">-</div>
                      )}
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>CDL Question Performance ({sortedQuestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 w-1/2">
                      <SortButton field="question">Question</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="timesAnswered">Answered</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="correct">Correct</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="wrong">Wrong</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="accuracy">Accuracy</SortButton>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        No CDL questions available
                      </td>
                    </tr>
                  ) : (
                    sortedQuestions.map((item) => (
                      <tr
                        key={item.question.questionId}
                        className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setExpandedQuestionId(
                          expandedQuestionId === item.question.questionId ? null : item.question.questionId
                        )}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-start gap-2">
                            <StatusIcon item={item} />
                            <div>
                              <p className="text-sm line-clamp-2">{item.question.question}</p>
                              <p className="text-xs text-gray-500 mt-1 capitalize">
                                {item.question.category.replace(/([A-Z])/g, " $1").trim()}
                              </p>
                              {expandedQuestionId === item.question.questionId && (
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Answers</p>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null); }}
                                      className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                      <X className="h-4 w-4 text-gray-400" />
                                    </button>
                                  </div>
                                  {["A", "B", "C", "D"].map((letter) => {
                                    const optionKey = `option${letter}` as keyof Question;
                                    const optionText = item.question[optionKey] as string;
                                    const isCorrect = item.question.correctAnswer === letter;
                                    return (
                                      <div
                                        key={letter}
                                        className={`flex items-start gap-2 p-2 rounded text-sm ${
                                          isCorrect
                                            ? "bg-green-50 border border-green-200"
                                            : "bg-gray-50 border border-gray-200"
                                        }`}
                                      >
                                        <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-gray-500"}`}>
                                          {letter}.
                                        </span>
                                        <span className={isCorrect ? "text-green-700" : "text-gray-600"}>
                                          {optionText}
                                        </span>
                                        {isCorrect && (
                                          <CheckCircle className="h-4 w-4 text-green-600 ml-auto flex-shrink-0" />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={item.timesAnswered > 0 ? "font-semibold" : "text-gray-400"}>
                            {item.timesAnswered}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={item.correct > 0 ? "font-semibold text-green-600" : "text-gray-400"}>
                            {item.correct}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={item.wrong > 0 ? "font-semibold text-red-600" : "text-gray-400"}>
                            {item.wrong}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.timesAnswered > 0 ? (
                            <span className={`font-semibold ${
                              item.accuracy === 100 ? "text-green-600" : item.accuracy >= 50 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {item.accuracy}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
