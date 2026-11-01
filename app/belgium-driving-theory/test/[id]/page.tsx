"use client";

import "@/lib/banks/bedriving";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function BedrivingTestPage() {
  return <ExamTestPage exam={getExamById("bedriving")!} />;
}
