"use client";

import { StatsV2 } from "@/components/v2/StatsV2";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/az104";

export default function StatsPage() {
  return <StatsV2 exam={getExamV2("az104")} />;
}
