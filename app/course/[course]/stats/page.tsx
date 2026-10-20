"use client";

import "@/lib/banks/courses";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { useCourse } from "@/hooks/useCourse";

export default function CourseStatsPage() {
  return <ExamStatsPage exam={useCourse()} />;
}
