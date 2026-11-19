"use client";

import "@/lib/banks/carscook";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CarscookDrillPage() {
  return <ExamDrillPage exam={getExamById("carscook")!} />;
}
