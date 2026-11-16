"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HkNursingDrillPage() {
  return <ExamDrillPage exam={getExamById("hknurse")!} />;
}
