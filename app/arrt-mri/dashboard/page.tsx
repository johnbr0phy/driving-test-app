"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ArrtMriDashboardPage() {
  return <ExamDashboard exam={getExamById("arrtmri")!} />;
}
