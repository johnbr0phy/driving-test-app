"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

export interface CommunityQuestion {
  questionId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  errorRate: number; // 0-100
  wrong: number;
  total: number;
}

export interface CommunityStatsData {
  questions: CommunityQuestion[];
  totalUsers: number;
  updatedAt: string | null;
}

export function useCommunityStats() {
  const { language } = useTranslation();
  const [data, setData] = useState<CommunityStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const url = language === "es" ? "/api/community-stats?lang=es" : "/api/community-stats";
        const res = await fetch(url);
        const json = await res.json();
        if (!cancelled && Array.isArray(json.questions) && json.questions.length > 0) {
          setData(json as CommunityStatsData);
        }
      } catch (e) {
        console.error("Failed to load community stats:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return { data, loading };
}
