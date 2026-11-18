"use client";

import "@/lib/banks/frvtc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrvtcDrillPage() {
  return <ExamDrillPage exam={getExamById("frvtc")!} />;
}
