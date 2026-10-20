"use client";

import "@/lib/banks/courses";
import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { useCourse } from "@/hooks/useCourse";

export default function CourseDashboardPage() {
  return <ExamDashboard exam={useCourse()} />;
}
