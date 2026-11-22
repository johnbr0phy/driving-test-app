"use client";

import "@/lib/banks/plaplik";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PlaplikDrillPage() {
  return <ExamDrillPage exam={getExamById("plaplik")!} />;
}
