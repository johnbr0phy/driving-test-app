"use client";

import "@/lib/banks/propertyCasualtyStates";
import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateDashboardPage() {
  return <ExamDashboard exam={useExamVariant("pnc")} />;
}
