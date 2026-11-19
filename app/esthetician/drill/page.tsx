"use client";

import "@/lib/banks/esthetician";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EstheticianDrillPage() {
  return <ExamDrillPage exam={getExamById("esthetician")!} />;
}
