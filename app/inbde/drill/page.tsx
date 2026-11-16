"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function InbdeDrillPage() {
  return <ExamDrillPage exam={getExamById("inbde")!} />;
}
