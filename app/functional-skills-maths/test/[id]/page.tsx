"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/fsmaths";

// No V2TestGate: the whole of Functional Skills Maths is free, both papers included.
export default function FsMathsTestPage() {
  const params = useParams();
  const exam = getExamV2("fsmaths");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
