"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NcmhceDrillPage() {
  return <ExamDrillPage exam={getExamById("ncmhce")!} />;
}
