"use client";

import "@/lib/banks/faaama";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FaaMechanicAirframeDrillPage() {
  return <ExamDrillPage exam={getExamById("faaama")!} />;
}
