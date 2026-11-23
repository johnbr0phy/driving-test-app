"use client";

import "@/lib/banks/ukfood3";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkFood3DrillPage() {
  return <ExamDrillPage exam={getExamById("ukfood3")!} />;
}
