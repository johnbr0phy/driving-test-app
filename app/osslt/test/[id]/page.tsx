"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/osslt";

// No V2TestGate: the whole OSSLT is free, both tests included.
export default function OssltTestPage() {
  const params = useParams();
  const exam = getExamV2("osslt");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
