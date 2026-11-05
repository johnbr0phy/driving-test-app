"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhinsuranceDrillPage() {
  return <ExamDrillPage exam={getExamById("phinsurance")!} />;
}
