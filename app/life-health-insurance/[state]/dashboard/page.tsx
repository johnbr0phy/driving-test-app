"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateDashboardPage() {
  return <ExamDashboard exam={useExamVariant("insurance")} />;
}
