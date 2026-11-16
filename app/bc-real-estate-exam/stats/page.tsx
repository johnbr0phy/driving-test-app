"use client";

import "@/lib/banks/bcrealestate";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BcRealEstateStatsPage() {
  return <ExamStatsPage exam={getExamById("bcrealestate")!} />;
}
