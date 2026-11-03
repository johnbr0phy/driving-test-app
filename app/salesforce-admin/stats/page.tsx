"use client";

import "@/lib/banks/sfadmin";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SalesforceAdminStatsPage() {
  return <ExamStatsPage exam={getExamById("sfadmin")!} />;
}
