"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NptePtDrillPage() {
  return <ExamDrillPage exam={getExamById("nptept")!} />;
}
