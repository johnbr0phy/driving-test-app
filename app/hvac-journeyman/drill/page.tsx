"use client";

import "@/lib/banks/hvacjourney";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HvacJourneymanDrillPage() {
  return <ExamDrillPage exam={getExamById("hvacjourney")!} />;
}
