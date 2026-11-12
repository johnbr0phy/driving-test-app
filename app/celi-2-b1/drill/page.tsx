"use client";

import "@/lib/banks/itceli";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ItceliDrillPage() {
  return <ExamDrillPage exam={getExamById("itceli")!} />;
}
