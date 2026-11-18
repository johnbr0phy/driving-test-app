"use client";

import "@/lib/banks/frcivique";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrciviqueStatsPage() {
  return <ExamStatsPage exam={getExamById("frcivique")!} />;
}
