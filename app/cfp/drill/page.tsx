"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CfpDrillPage() {
  return <ExamDrillPage exam={getExamById("cfp")!} />;
}
