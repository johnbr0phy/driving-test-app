"use client";

import "@/lib/banks/courses";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { useCourse } from "@/hooks/useCourse";

export default function CourseDrillPage() {
  return <ExamDrillPage exam={useCourse()} />;
}
