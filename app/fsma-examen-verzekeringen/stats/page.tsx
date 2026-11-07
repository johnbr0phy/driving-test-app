"use client";

import "@/lib/banks/befsmavz";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BefsmavzStatsPage() {
  return <ExamStatsPage exam={getExamById("befsmavz")!} />;
}
