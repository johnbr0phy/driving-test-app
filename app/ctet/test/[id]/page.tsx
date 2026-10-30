"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/ctet";

export default function TestPage() {
  const params = useParams();
  return <ExamRunner exam={getExamV2("ctet")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
