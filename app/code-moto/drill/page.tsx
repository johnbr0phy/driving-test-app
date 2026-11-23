"use client";

import "@/lib/banks/frmoto";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("frmoto")!} />;
}
