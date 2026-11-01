"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DkteoriDrillPage() {
  return <ExamDrillPage exam={getExamById("dkteori")!} />;
}
