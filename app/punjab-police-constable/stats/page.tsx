"use client";

import "@/lib/banks/punjabpolice";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PunjabpoliceStatsPage() {
  return <ExamStatsPage exam={getExamById("punjabpolice")!} />;
}
