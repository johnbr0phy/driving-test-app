"use client";

import { useParams } from "next/navigation";
import { ResultsV2 } from "@/components/v2/ResultsV2";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/ocnsw";

export default function OcNswResultsPage() {
  const params = useParams();
  return <ResultsV2 exam={getExamV2("ocnsw")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
