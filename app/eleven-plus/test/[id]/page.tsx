"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/elevenplus";

// No V2TestGate: the whole 11+ is free, both tests included.
export default function ElevenPlusTestPage() {
  const params = useParams();
  const exam = getExamV2("elevenplus");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
