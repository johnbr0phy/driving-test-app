"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PkpafDashboardPage() {
  return <ExamDashboard exam={getExamById("pkpaf")!} />;
}
