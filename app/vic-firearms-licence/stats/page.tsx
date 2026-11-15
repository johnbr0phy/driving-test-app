"use client";

import "@/lib/banks/aufirearmsvic";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function VicFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufirearmsvic")!} />;
}
