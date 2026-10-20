"use client";

import "@/lib/banks/courses";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { useCourse } from "@/hooks/useCourse";

export default function CourseTrainingPage() {
  return <ExamTrainingPage exam={useCourse()} />;
}
