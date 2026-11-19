"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AnnualFederalTaxRefresherDrillPage() {
  return <ExamDrillPage exam={getExamById("afsp")!} />;
}
