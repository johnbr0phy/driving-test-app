"use client";

import "@/lib/banks/dkjagt";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DkjagtDrillPage() {
  return <ExamDrillPage exam={getExamById("dkjagt")!} />;
}
