"use client";

import "@/lib/banks/frcivique";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrciviqueDrillPage() {
  return <ExamDrillPage exam={getExamById("frcivique")!} />;
}
