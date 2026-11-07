"use client";

import "@/lib/banks/roadmed";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RoadmedDrillPage() {
  return <ExamDrillPage exam={getExamById("roadmed")!} />;
}
