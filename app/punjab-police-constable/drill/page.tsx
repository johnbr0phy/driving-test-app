"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PunjabpoliceDrillPage() {
  return <ExamDrillPage exam={getExamById("punjabpolice")!} />;
}
