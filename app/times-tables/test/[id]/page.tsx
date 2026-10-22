"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/timestables";

// No V2TestGate: the whole exam is free.
export default function TimesTablesTestPage() {
  const params = useParams();
  const exam = getExamV2("timestables");
  const testNumber = parseInt(params.id as string, 10) || 0;
  return <ExamRunner exam={exam} testNumber={testNumber} />;
}
