"use client";

import "@/lib/banks/contractorlaw";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ContractorLawStatsPage() {
  return <ExamStatsPage exam={getExamById("contractorlaw")!} />;
}
