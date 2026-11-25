"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GulfmdDrillPage() {
  return <ExamDrillPage exam={getExamById("gulfmd")!} />;
}
