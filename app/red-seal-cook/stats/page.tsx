"use client";

import "@/lib/banks/carscook";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CarscookStatsPage() {
  return <ExamStatsPage exam={getExamById("carscook")!} />;
}
