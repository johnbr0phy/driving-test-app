"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateDashboardPage() {
  return <ExamDashboard exam={useExamVariant("realestate")} />;
}
