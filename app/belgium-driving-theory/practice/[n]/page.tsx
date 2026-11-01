"use client";

import "@/lib/banks/bedriving";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function BedrivingTrainingPage() {
  return <ExamTrainingPage exam={getExamById("bedriving")!} />;
}
