"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowLeft, ArrowUpDown, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
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

export default function QuestionsPage() {
  const router = useRouter();
  const hydrated = useHydration();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);

  const [sortField, setSortField] = useState<SortField>("timesAnswered");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

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

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const answered = questionsWithPerformance.filter((q) => q.timesAnswered > 0);
    const totalAnswered = answered.reduce((sum, q) => sum + q.timesAnswered, 0);
    const totalCorrect = answered.reduce((sum, q) => sum + q.correct, 0);
    const totalWrong = answered.reduce((sum, q) => sum + q.wrong, 0);

    return {
      totalQuestions: questionsWithPerformance.length,
      uniqueQuestionsAnswered: answered.length,
      totalAnswered,
      totalCorrect,
      totalWrong,
      overallAccuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
    };
  }, [questionsWithPerformance]);

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
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Question Performance</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Track your performance on all {stateName} questions
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1">
                {summaryStats.uniqueQuestionsAnswered}/{summaryStats.totalQuestions}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Questions Seen</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1">{summaryStats.totalAnswered}</div>
              <div className="text-xs md:text-sm text-gray-600">Total Attempts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">{summaryStats.totalCorrect}</div>
              <div className="text-xs md:text-sm text-gray-600">Correct</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">{summaryStats.totalWrong}</div>
              <div className="text-xs md:text-sm text-gray-600">Wrong</div>
            </CardContent>
          </Card>
        </div>

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

        {/* Mobile Card View */}
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

        {/* Desktop Table View */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Questions ({sortedQuestions.length})</CardTitle>
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

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/dashboard">
            <Button className="bg-black text-white hover:bg-gray-800">
              Start Training
            </Button>
          </Link>
          <Link href="/stats">
            <Button variant="outline">
              View Statistics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
