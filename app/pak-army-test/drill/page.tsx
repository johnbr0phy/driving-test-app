"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PakarmyDrillPage() {
  return <ExamDrillPage exam={getExamById("pakarmy")!} />;
}
