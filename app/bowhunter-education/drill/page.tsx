"use client";

import "@/lib/banks/bowhunter";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BowhunterDrillPage() {
  return <ExamDrillPage exam={getExamById("bowhunter")!} />;
}
