"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SmartServeDrillPage() {
  return <ExamDrillPage exam={getExamById("smartserve")!} />;
}
