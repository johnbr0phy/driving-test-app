"use client";

import { useParams } from "next/navigation";
import { ResultsV2 } from "@/components/v2/ResultsV2";
import { getExamV2 } from "@/lib/v2/registry";

export default function SatResultsPage() {
  const params = useParams();
  return <ResultsV2 exam={getExamV2("sat")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
