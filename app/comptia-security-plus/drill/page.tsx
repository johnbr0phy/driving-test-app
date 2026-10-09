"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SecplusDrillPage() {
  return <ExamDrillPage exam={getExamById("secplus")!} />;
}
