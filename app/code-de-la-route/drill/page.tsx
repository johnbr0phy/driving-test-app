"use client";

import "@/lib/banks/frcode";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrcodeDrillPage() {
  return <ExamDrillPage exam={getExamById("frcode")!} />;
}
