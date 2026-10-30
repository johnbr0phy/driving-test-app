"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/naplan7";

// No V2TestGate: the whole NAPLAN is free, both tests included.
export default function Naplan7TestPage() {
  const params = useParams();
  const exam = getExamV2("naplan7");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
