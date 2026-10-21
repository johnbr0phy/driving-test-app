"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/ged";

// No V2TestGate: the whole GED is free, both tests included.
export default function GedTestPage() {
  const params = useParams();
  const exam = getExamV2("ged");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
