"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AclsDashboardPage() {
  return <ExamDashboard exam={getExamById("acls")!} />;
}
