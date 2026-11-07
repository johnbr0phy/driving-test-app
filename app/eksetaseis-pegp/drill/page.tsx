"use client";

import "@/lib/banks/grcitizen";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GrcitizenDrillPage() {
  return <ExamDrillPage exam={getExamById("grcitizen")!} />;
}
