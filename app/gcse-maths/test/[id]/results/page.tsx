"use client";

import { useParams } from "next/navigation";
import { ResultsV2 } from "@/components/v2/ResultsV2";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/gcsemaths";

export default function GcseMathsResultsPage() {
  const params = useParams();
  return <ResultsV2 exam={getExamV2("gcsemaths")} testNumber={parseInt(params.id as string, 10) || 0} />;
}
