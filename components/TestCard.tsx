"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { PremiumBadge } from "@/components/PremiumBadge";
import { useTranslation } from "@/contexts/LanguageContext";

interface TestCardProps {
  testNumber: number;
  status: "not-started" | "in-progress" | "completed";
  score?: number;
  totalQuestions?: number;
  progress?: number;
  bestScore?: number;
  attemptCount?: number;
  locked?: boolean;
  lockMessage?: string;
  isPremiumLocked?: boolean;
  onPremiumClick?: () => void;
  href?: string;
  readyToTest?: boolean;
}

export function TestCard({
  testNumber,
  status,
  totalQuestions = 50,
  progress = 0,
  bestScore,
  locked = false,
  isPremiumLocked = false,
  onPremiumClick,
  href,
  readyToTest = false,
}: TestCardProps) {
  const { t } = useTranslation();
  const bestPercentage = bestScore ? Math.round((bestScore / totalQuestions) * 100) : 0;

  const getStatusBadge = () => {
    if (isPremiumLocked) {
      return <PremiumBadge variant="locked" size="sm" />;
    }
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-xs">{t("common.locked")}</Badge>;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">{t("testCard.mastered")}</Badge>;
      } else if (bestPercentage >= 70) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">{t("testCard.passed")}</Badge>;
      } else {
        return <Badge className="bg-brand hover:bg-brand text-xs">{t("testCard.keepPracticing")}</Badge>;
      }
    }

    switch (status) {
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs">{t("testCard.inProgress")}</Badge>;
      default:
        return null;
    }
  };

  const getSubtext = () => {
    if (locked) {
      return <span className="text-gray-400">{t("common.locked")}</span>;
    }
    if (isPremiumLocked) {
      return <span className="text-brand">{t("common.unlockWithPremium")}</span>;
    }
    if (status === "in-progress") {
      const answeredCount = Math.round((progress / 100) * totalQuestions);
      return <span className="text-yellow-600">{answeredCount}/{totalQuestions} {t("testCard.answered")}</span>;
    }
    if (status === "completed" && bestScore !== undefined) {
      return (
        <span className={bestPercentage >= 70 ? 'text-green-600' : 'text-brand'}>
          {bestScore}/{totalQuestions}
        </span>
      );
    }
    if (readyToTest) {
      return <span className="text-green-600 font-medium">You&apos;re ready — give it a go →</span>;
    }
    return <span className="text-gray-400">{t("testCard.fiftyQuestions")}</span>;
  };

  const cardContent = (
    <Card className={`h-full transition-all ${
      locked
        ? "bg-gray-100 border-gray-200 opacity-60"
        : isPremiumLocked
          ? "bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light hover:shadow-md hover:border-brand-border cursor-pointer"
          : readyToTest
            ? "bg-gray-50 hover:shadow-md cursor-pointer border-green-400 ring-2 ring-green-300 ring-offset-1 animate-pulse-subtle"
            : "bg-gray-50 hover:shadow-md cursor-pointer hover:border-brand-border"
    }`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{t("testCard.test")} {testNumber}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-xs">
            {getSubtext()}
          </p>
        </div>
        {!locked && <ChevronRight className={`h-5 w-5 ${isPremiumLocked ? "text-brand-muted" : "text-gray-400"}`} />}
      </CardContent>
    </Card>
  );

  if (locked) {
    return cardContent;
  }

  if (isPremiumLocked && onPremiumClick) {
    return (
      <button onClick={onPremiumClick} className="block h-full w-full text-left">
        {cardContent}
      </button>
    );
  }

  return (
    <Link href={href || `/test/${testNumber}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
