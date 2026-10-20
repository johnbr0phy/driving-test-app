"use client";

import "@/lib/banks/courses";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { useCourse } from "@/hooks/useCourse";

export default function CourseTestPage() {
  return <ExamTestPage exam={useCourse()} />;
}
