"use client";

import { notFound, useParams } from "next/navigation";
import { ExamConfig, getCourseByKey } from "@/lib/exams";

/** The teacher's course named by the [course] route segment; 404 for any other value. */
export function useCourse(): ExamConfig {
  const { course } = useParams<{ course: string }>();
  const exam = getCourseByKey(course);
  if (!exam) notFound();
  return exam;
}
