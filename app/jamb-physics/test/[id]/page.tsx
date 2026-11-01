"use client";

import { useParams } from "next/navigation";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/jambphys";

export default function TestPage() {
  const params = useParams();
  return <ExamRunner exam={getExamV2("jambphys")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
