"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import type { ExamCommunityQuestion } from "@/lib/communityStats";

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

// One fetch per page load for the list of tests that have Common Mistakes
// (lib/communityStats.ts), shared by the header, dashboard and landing.
let availablePromise: Promise<Set<string>> | null = null;
function loadAvailable(): Promise<Set<string>> {
  availablePromise ??= fetch("/api/community-stats/exams")
    .then((res) => res.json())
    .then((json) => new Set<string>(Array.isArray(json.available) ? json.available : []))
    .catch(() => {
      availablePromise = null;
      return new Set<string>();
    });
  return availablePromise;
}

/** Whether this test ("dmv" or a registry exam id) has Common Mistakes yet.
 *  False until the list loads, so nothing flashes in and out. */
export function useCommunityAvailable(examId: string | undefined): boolean {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (!examId) return;
    let cancelled = false;
    loadAvailable().then((set) => {
      if (!cancelled) setAvailable(set.has(examId));
    });
    return () => {
      cancelled = true;
    };
  }, [examId]);
  return available;
}

/** A registry exam's most-missed questions, ids and rates only. */
export function useExamCommunityStats(examId: string, enabled: boolean) {
  const [data, setData] = useState<{ questions: ExamCommunityQuestion[]; totalUsers: number } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch(`/api/community-stats?exam=${encodeURIComponent(examId)}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && Array.isArray(json.questions)) setData({ questions: json.questions, totalUsers: json.totalUsers ?? 0 });
      })
      .catch((e) => console.error("Failed to load community stats:", e))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [examId, enabled]);
  return { data, loading };
}
