"use client";

import "@/lib/banks/acls";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AclsStatsPage() {
  return <ExamStatsPage exam={getExamById("acls")!} />;
}
