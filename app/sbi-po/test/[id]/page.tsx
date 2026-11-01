"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/sbipo";

export default function TestPage() {
  const params = useParams();
  return <ExamRunner exam={getExamV2("sbipo")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
