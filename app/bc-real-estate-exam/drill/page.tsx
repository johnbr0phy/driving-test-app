"use client";

import "@/lib/banks/bcrealestate";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BcRealEstateDrillPage() {
  return <ExamDrillPage exam={getExamById("bcrealestate")!} />;
}
