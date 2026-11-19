"use client";

import "@/lib/banks/cosmoinstructor";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CosmoInstructorStatsPage() {
  return <ExamStatsPage exam={getExamById("cosmoinstructor")!} />;
}
