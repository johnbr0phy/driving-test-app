"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PkdriveDrillPage() {
  return <ExamDrillPage exam={getExamById("pkdrive")!} />;
}
