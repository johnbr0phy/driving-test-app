"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpaAudDrillPage() {
  return <ExamDrillPage exam={getExamById("cpaaud")!} />;
}
