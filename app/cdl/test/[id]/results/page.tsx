"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, TrendingUp, Sparkles, ArrowLeft, BarChart3, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Cloud } from "lucide-react";
import { Fireworks } from "@/components/Fireworks";
import { ShareButton } from "@/components/ShareButton";
import { useTranslation } from "@/contexts/LanguageContext";


function getTigerFace(percentage: number): string {
  if (percentage >= 100) return "/tiger_face_01.png";
  if (percentage >= 85) return "/tiger_face_02.png";
  if (percentage >= 70) return "/tiger_face_03.png";
  if (percentage >= 55) return "/tiger_face_04.png";
  if (percentage >= 40) return "/tiger_face_05.png";
  if (percentage >= 25) return "/tiger_face_06.png";
  if (percentage >= 10) return "/tiger_face_07.png";
  return "/tiger_face_08.png";
}

function getCDLTagline(percentage: number): string {
  if (percentage >= 100) return "PERFECT SCORE";
  if (percentage >= 90) return "READY FOR THE CDL TEST";
  if (percentage >= 80) return "PASSED MY CDL PRACTICE TEST";
  if (percentage >= 70) return "CLOSE BUT NOT QUITE";
  if (percentage >= 50) return "FAILED MY CDL PRACTICE TEST";
  if (percentage >= 30) return "NEED MORE STUDY TIME";
  return "BACK TO THE HANDBOOK";
}

function CDLResultsPageContent() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();
  const { t } = useTranslation();

  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  const isGuest = useStore((state) => state.isGuest);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);

  const testSession = hydrated ? getTestSession(testId) : null;
  const attemptStats = hydrated ? getTestAttemptStats(testId) : null;

  useEffect(() => {
    if (!hydrated) {
      return; // Wait for hydration
    }

    if (!testSession) {
      // No test session found, redirect to test
      router.push(`/cdl/test/${testId}`);
    } else {
      setLoading(false);
      // Show fireworks if passed (80% or higher for CDL)
      const score = testSession.score || 0;
      const total = testSession.questions.length;
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      if (percentage >= 80) {
        setShowFireworks(true);
      }
    }
  }, [testSession, testId, router, hydrated]);

  // Compute weak categories from THIS test's wrong answers
  const weakCategories = useMemo(() => {
    if (!testSession) return [];
    const categoryStats: { [cat: string]: { correct: number; wrong: number } } = {};
    testSession.answers.forEach((answer, index) => {
      const q = testSession.questions[index];
      if (!q) return;
      const cat = q.category;
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, wrong: 0 };
      if (answer.isCorrect) {
        categoryStats[cat].correct++;
      } else {
        categoryStats[cat].wrong++;
      }
    });
    return Object.entries(categoryStats)
      .filter(([, stats]) => stats.wrong > 0)
      .map(([category, stats]) => ({
        category,
        wrong: stats.wrong,
        total: stats.correct + stats.wrong,
        accuracy: Math.round((stats.correct / (stats.correct + stats.wrong)) * 100),
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [testSession]);

  if (!testSession) {
    return null;
  }

  const questions = testSession.questions;
  const score = testSession.score || 0;
  const answers: { [key: number]: string } = {};
  testSession.answers.forEach((answer, index) => {
    answers[index] = answer.userAnswer;
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 80; // CDL passing score is 80%

  // Calculate improvement metrics
  const firstScore = attemptStats?.firstScore || score;
  const bestScore = attemptStats?.bestScore || score;
  const firstPercentage = Math.round((firstScore / totalQuestions) * 100);
  const bestPercentage = Math.round((bestScore / totalQuestions) * 100);
  const improvement = percentage - firstPercentage;
  const isNewBest = score === bestScore && attemptStats && attemptStats.attemptCount > 1;
  const attemptNumber = attemptStats?.attemptCount || 1;

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(questions.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">{t("results.loadingResults")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={() => setShowFireworks(false)} />
      )}

      {/* Full-bleed Score Card */}
      <div className={`${passed ? "bg-gradient-to-b from-gray-950 to-brand-darker" : "bg-gradient-to-b from-gray-950 to-brand-darker"}`}>
        {/* Back button */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Link href="/cdl/dashboard">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CDL Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-center px-6 pt-4 pb-10 max-w-lg mx-auto">
          {/* Branding header */}
          <div className="mb-6">
            <div className="text-gray-300 text-lg font-bold tracking-widest">tigertest.io</div>
            <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">
              CDL PRACTICE TEST
            </div>
          </div>

          {/* Tiger face */}
          <div className="flex justify-center mb-5">
            <Image
              src={getTigerFace(percentage)}
              alt="Tiger mascot"
              width={160}
              height={160}
              className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
              priority
            />
          </div>

          {/* Tagline */}
          <div className={`text-base md:text-lg font-extrabold uppercase tracking-widest mb-4 ${passed ? "text-brand-border" : "text-brand-border"}`}>
            {getCDLTagline(percentage)}
          </div>

          {/* Giant percentage */}
          <div className={`text-7xl md:text-8xl font-black mb-3 leading-none ${passed ? "text-brand" : "text-brand"}`}>
            {percentage}%
          </div>

          {/* X out of 50 correct */}
          <div className="text-xl md:text-2xl text-gray-400 mb-5">
            {score} {t("results.outOf")} {totalQuestions} {t("results.correctLabel")}
          </div>

          {/* PASSED/FAILED badge */}
          <Badge
            className={`text-lg px-6 py-2 mb-5 ${
              passed ? "bg-brand hover:bg-brand-hover" : "bg-brand hover:bg-brand-hover"
            }`}
          >
            {passed ? t("results.passed") : t("results.failed")}
          </Badge>

          {/* CDL Test label */}
          <div className="text-gray-400 text-base mb-2">
            CDL Test {testId}
          </div>

          {/* Branding footer */}
          <div className="text-gray-600 text-sm tracking-wider mb-8">tigertest.io</div>

          {/* SHARE + TRY AGAIN buttons */}
          <div className="flex gap-3 max-w-xs mx-auto">
            <ShareButton
              score={score}
              totalQuestions={totalQuestions}
              percentage={percentage}
              passed={passed}
              testId={testId}
              stateCode="CDL"
              className="flex-1 bg-white text-black hover:bg-gray-100 font-bold uppercase tracking-wide h-12 text-base"
            />
            <Button
              className="flex-1 bg-transparent text-white hover:bg-white/10 border border-white/30 font-bold uppercase tracking-wide h-12 text-base"
              onClick={() => router.push(`/cdl/test/${testId}`)}
            >
              {t("results.tryAgain")}
            </Button>
          </div>
        </div>
      </div>

      {/* See Stats arrow */}
      <div className="text-center py-5 bg-gray-50">
        <button
          onClick={() => document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" })}
          className="text-gray-500 hover:text-gray-700 flex flex-col items-center gap-1 mx-auto transition-colors"
        >
          <span className="text-sm font-medium">{t("results.viewStats")}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>

      {/* Stats & Details Section */}
      <div id="stats-section" className="container mx-auto px-4 pb-8 max-w-6xl">
        {/* Guest Signup Prompt */}
        {isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-brand" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{t("results.saveYourProgress")}</h3>
                  <p className="text-gray-600">
                    {t("results.scoreOnlyOnDevice")}
                  </p>
                </div>
                <Link href="/signup">
                  <Button className="bg-brand text-white hover:bg-brand-hover whitespace-nowrap">
                    {t("results.signUpFree")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Improvement Stats */}
        {attemptStats && attemptStats.attemptCount > 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">{t("results.yourProgress")}</CardTitle>
              <p className="text-center text-sm text-gray-600">{t("results.attempt")} #{attemptNumber}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* First Attempt */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">{t("results.firstAttempt")}</div>
                    <div className="text-4xl font-bold text-gray-700 mb-1">
                      {firstPercentage}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {firstScore}/{totalQuestions} {t("results.correctLabel")}
                    </div>
                  </CardContent>
                </Card>

                {/* This Attempt */}
                <Card className="bg-brand-light border-brand-border-light border-2">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-brand-dark mb-2">{t("results.thisAttempt")}</div>
                    <div className="text-4xl font-bold text-brand mb-1">
                      {percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {score}/{totalQuestions} {t("results.correctLabel")}
                    </div>
                    {isNewBest && (
                      <div className="flex items-center justify-center gap-1 text-yellow-600 font-semibold mt-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm">{t("results.newBest")}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Best Score */}
                <Card className="bg-brand-light border-brand-border-light">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-brand-dark mb-2">{t("results.bestScore")}</div>
                    <div className="text-4xl font-bold text-brand mb-1">
                      {bestPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {bestScore}/{totalQuestions} {t("results.correctLabel")}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Message */}
              {improvement > 0 && (
                <div className="flex items-center justify-center gap-2 bg-brand-light border-2 border-brand-border rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-brand" />
                  <span className="text-lg font-semibold text-brand-dark">
                    {t("results.improvedBy")} {improvement}% {t("results.sinceFirstAttempt")} 🚀
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Weak Areas Insight → Stats CTA */}
        {!isGuest && weakCategories.length > 0 && (
          <Link href="/cdl/dashboard" className="block">
            <Card className="mb-6 border-brand-border-light bg-gradient-to-r from-brand-light to-brand-gradient-to cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-light rounded-full flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {passed ? "Your Performance Breakdown" : "Topics to Focus On"}
                    </h3>
                    <div className="space-y-2">
                      {weakCategories.slice(0, 3).map(({ category, wrong, total, accuracy }) => (
                        <div key={category} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 font-medium">{t(`categories.${category}`) || category}</span>
                              <span className={`font-semibold ${accuracy >= 80 ? "text-brand" : accuracy >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                                {accuracy}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className={`h-1.5 rounded-full ${accuracy >= 80 ? "bg-brand" : accuracy >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${accuracy}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-brand font-medium mt-3">
                      View CDL Dashboard
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-brand-muted flex-shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Question Review */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t("results.reviewQuestions")}</h2>
          <div className="flex gap-2">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300" onClick={expandAll}>
              {t("results.expandAll")}
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300" onClick={collapseAll}>
              {t("results.collapseAll")}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const isExpanded = expandedQuestions.has(index);

            return (
              <Card key={index}>
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        isCorrect
                          ? "bg-brand-light text-brand-dark"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{question.question}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {t("results.yourAnswer")}: <span className="font-semibold">{userAnswer || t("results.notAnswered")}</span>
                          {!isCorrect && (
                            <span className="ml-2">
                              • {t("results.correctAnswer")}: <span className="font-semibold text-brand">{question.correctAnswer}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={isCorrect ? "bg-brand" : "bg-red-500"}>
                        {isCorrect ? t("results.correctAnswer") : t("results.wrong")}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    <QuestionCard
                      question={question}
                      selectedAnswer={userAnswer}
                      onAnswerChange={() => {}}
                      showResult={true}
                    />
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default function CDLResultsPage() {
  return (
    
      <CDLResultsPageContent />
    
  );
}
