"use client";

import { DashboardV2 } from "@/components/v2/DashboardV2";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/vicsel";

export default function VicSelDashboardPage() {
  return <DashboardV2 exam={getExamV2("vicsel")} />;
}
