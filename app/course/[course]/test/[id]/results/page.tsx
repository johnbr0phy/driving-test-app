"use client";

import "@/lib/banks/courses";
import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { useCourse } from "@/hooks/useCourse";

export default function CourseResultsPage() {
  return <ExamResultsPage exam={useCourse()} />;
}
