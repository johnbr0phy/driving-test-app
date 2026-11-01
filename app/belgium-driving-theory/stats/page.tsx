"use client";

import "@/lib/banks/bedriving";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BedrivingStatsPage() {
  return <ExamStatsPage exam={getExamById("bedriving")!} />;
}
