"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NptePtaDrillPage() {
  return <ExamDrillPage exam={getExamById("nptepta")!} />;
}
