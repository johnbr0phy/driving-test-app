"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Swords } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface ChallengeButtonProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  testId: number;
  stateCode: string;
  className?: string;
}

export function ChallengeButton({
  score,
  totalQuestions,
  percentage,
  passed,
  testId,
  stateCode,
  className,
}: ChallengeButtonProps) {
  const [copied, setCopied] = useState(false);
  const { language } = useTranslation();
  const { user } = useAuth();

  const firstName = user?.displayName?.split(" ")[0] || "Someone";

  const generateLink = () => {
    const payload = {
      n: firstName,
      s: score,
      t: totalQuestions,
      p: percentage,
      st: stateCode,
      id: testId,
      ok: passed ? 1 : 0,
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    const base = typeof window !== "undefined" ? window.location.origin : "https://tigertest.io";
    return `${base}/challenge?c=${encoded}`;
  };

  const handleChallenge = async () => {
    const link = generateLink();

    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Button
      className={
        className ||
        "bg-orange-500 text-white hover:bg-orange-600 font-bold uppercase tracking-wide h-12 text-sm flex items-center gap-2"
      }
      onClick={handleChallenge}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {language === "es" ? "¡Link copiado!" : "Link copied!"}
        </>
      ) : (
        <>
          <Swords className="h-4 w-4" />
          {language === "es" ? "Retar a un amigo" : "Challenge a friend"}
        </>
      )}
    </Button>
  );
}
