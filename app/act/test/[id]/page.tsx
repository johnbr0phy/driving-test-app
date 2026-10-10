"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { V2TestGate } from "@/components/v2/V2TestGate";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/act";

export default function TestPage() {
  const params = useParams();
  const exam = getExamV2("act");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return (
    <V2TestGate exam={exam} testNumber={testNumber}>
      <ExamRunner exam={exam} testNumber={testNumber} />
    </V2TestGate>
  );
}
