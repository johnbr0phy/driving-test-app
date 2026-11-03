"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SalesforceAdminDrillPage() {
  return <ExamDrillPage exam={getExamById("sfadmin")!} />;
}
