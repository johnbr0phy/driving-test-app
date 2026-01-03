"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowUpDown, CheckCircle, XCircle, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";
import { Question } from "@/types";
import questionsData from "@/data/questions.json";

type SortField = "question" | "timesAnswered" | "correct" | "wrong" | "accuracy";
type SortDirection = "asc" | "desc";

interface QuestionWithPerformance {
  question: Question;
  timesAnswered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

// Category to training set mapping
const CATEGORY_TO_SET: { [key: string]: number } = {
  "Signs": 1,
  "Signals": 1,
  "Traffic Signs": 1,
  "Rules of the Road": 2,
  "Right of Way": 2,
  "Parking": 2,
  "Safety": 3,
  "Emergencies": 3,
  "DUI": 3,
  "State Laws": 4,
  "Licensing": 4,
};

const SET_NAMES: { [key: number]: string } = {
  1: "Signs & Signals",
  2: "Rules of the Road",
  3: "Safety & Emergencies",
  4: "State Laws",
};

export default function StatsPage() {
  const router = useRouter();
  const hydrated = useHydration();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

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

  // Redirect guests to signup
  useEffect(() => {
    if (hydrated && isGuest) {
      router.push("/signup");
    }
  }, [hydrated, isGuest, router]);

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  const passProbability = hydrated ? getPassProbability() : 0;

  // Get all questions for the current state
  const stateQuestions = useMemo(() => {
    if (!selectedState) return [];
    const allQuestions = questionsData as Question[];
    return allQuestions.filter(
      (q) => q.state === "ALL" || q.state === selectedState
    );
  }, [selectedState]);

  // Get performance data and merge with questions
  const questionsWithPerformance = useMemo((): QuestionWithPerformance[] => {
    if (!hydrated) return [];

    const performance = getQuestionPerformance();
    const performanceMap = new Map(
      performance.map((p) => [p.questionId, p])
    );

    return stateQuestions.map((question) => {
      const perf = performanceMap.get(question.questionId);
      return {
        question,
        timesAnswered: perf?.timesAnswered || 0,
        correct: perf?.timesCorrect || 0,
        wrong: perf?.timesWrong || 0,
        accuracy: perf?.accuracy || 0,
      };
    });
  }, [stateQuestions, getQuestionPerformance, hydrated]);

  // Sort questions
  const sortedQuestions = useMemo(() => {
    const sorted = [...questionsWithPerformance].sort((a, b) => {
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
    return sorted;
  }, [questionsWithPerformance, sortField, sortDirection]);

  // Calculate smart CTA recommendation
  const getRecommendation = useMemo(() => {
    if (!hydrated) return null;

    // Check if any tests have been taken
    const testStats = [1, 2, 3, 4].map(t => getTestAttemptStats(t));
    const hasAnyTests = testStats.some(s => s && s.attemptCount > 0);

    if (!hasAnyTests) {
      return {
        title: "Take Practice Test 1",
        description: "See where you stand with a full practice test",
        href: "/test/1",
        buttonText: "Start Test",
      };
    }

    // Find worst performing category
    const categoryStats: { [key: string]: { correct: number; wrong: number } } = {};

    questionsWithPerformance.forEach((q) => {
      const category = q.question.category;
      if (!categoryStats[category]) {
        categoryStats[category] = { correct: 0, wrong: 0 };
      }
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

    // If user is doing well
    if (passProbability >= 80) {
      return {
        title: "You're ready!",
        description: "Take a practice test to confirm",
        href: "/dashboard",
        buttonText: "Take Practice Test",
      };
    }

    // Recommend training on worst category
    if (worstCategory && worstWrongCount > 0) {
      const setNumber = CATEGORY_TO_SET[worstCategory] || 1;
      const setName = SET_NAMES[setNumber];
      const wrongPercent = Math.round(100 - worstAccuracy);

      return {
        title: `Practice "${setName}"`,
        description: `You're getting ${wrongPercent}% wrong on ${worstCategory.toLowerCase()} questions`,
        href: `/training?set=${setNumber}`,
        buttonText: "Start Training",
      };
    }

    // Default
    return {
      title: "Keep practicing",
      description: "Continue training to improve your score",
      href: "/dashboard",
      buttonText: "Go to Dashboard",
    };
  }, [hydrated, questionsWithPerformance, passProbability, getTestAttemptStats]);

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
      className="flex items-center gap-1 font-semibold hover:text-orange-600 transition-colors"
    >
      {children}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? "text-orange-600" : "text-gray-400"}`} />
    </button>
  );

  // Status icon component
  const StatusIcon = ({ item }: { item: QuestionWithPerformance }) => {
    if (item.timesAnswered === 0) {
      return <HelpCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />;
    } else if (item.accuracy === 100) {
      return <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />;
    } else if (item.accuracy === 0) {
      return <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-yellow-500 flex-shrink-0" />;
    }
  };

  if (!hydrated || !selectedState || isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Pass/Fail Probability - YOU ARE SHIT */}
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
                    ? "No data yet"
                    : passProbability > 50
                      ? `${passProbability}% chance of passing`
                      : `${100 - passProbability}% chance of failing`
                  }
                </h1>
                {passProbability > 0 && (
                  <Progress
                    value={passProbability}
                    className={`h-2 mt-3 ${
                      passProbability >= 80
                        ? '[&>div]:bg-emerald-500'
                        : passProbability >= 60
                          ? '[&>div]:bg-lime-500'
                          : passProbability >= 40
                            ? '[&>div]:bg-amber-500'
                            : passProbability >= 20
                              ? '[&>div]:bg-orange-500'
                              : '[&>div]:bg-red-500'
                    }`}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart CTA - DO THIS */}
        {getRecommendation && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{getRecommendation.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{getRecommendation.description}</p>
                </div>
                <Link href={getRecommendation.href}>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap">
                    {getRecommendation.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
                  ? "bg-orange-100 border-orange-300 text-orange-700 font-medium"
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

        {/* Mobile Card View - HERES THE DATA */}
        <div className="md:hidden space-y-3">
          {sortedQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No questions available.
              </CardContent>
            </Card>
          ) : (
            sortedQuestions.map((item) => (
              <Card key={item.question.questionId} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <StatusIcon item={item} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{item.question.question}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.question.type === "Universal" ? "Universal" : `${selectedState}-specific`}
                        {" "}&bull;{" "}
                        {item.question.category}
                      </p>
                    </div>
                  </div>
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
                          item.accuracy === 100
                            ? "text-green-600"
                            : item.accuracy >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
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

        {/* Desktop Table View - HERES THE DATA */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Question Performance ({sortedQuestions.length})</CardTitle>
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
                        No questions available.
                      </td>
                    </tr>
                  ) : (
                    sortedQuestions.map((item) => (
                      <tr
                        key={item.question.questionId}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <HoverCard openDelay={200} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <div className="flex items-start gap-2 cursor-default">
                                <StatusIcon item={item} />
                                <div>
                                  <p className="text-sm line-clamp-2">{item.question.question}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.question.type === "Universal" ? "Universal" : `${selectedState}-specific`}
                                    {" "}&bull;{" "}
                                    {item.question.category}
                                  </p>
                                </div>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-96" side="right" align="start">
                              <div className="space-y-2">
                                <p className="text-sm font-medium mb-3">{item.question.question}</p>
                                <div className="space-y-2">
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
                              </div>
                            </HoverCardContent>
                          </HoverCard>
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
                            <span
                              className={`font-semibold ${
                                item.accuracy === 100
                                  ? "text-green-600"
                                  : item.accuracy >= 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
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
