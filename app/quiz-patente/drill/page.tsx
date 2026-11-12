"use client";

import "@/lib/banks/itpatente";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ItpatenteDrillPage() {
  return <ExamDrillPage exam={getExamById("itpatente")!} />;
}
