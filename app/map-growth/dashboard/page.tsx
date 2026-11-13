"use client";

import { DashboardV2 } from "@/components/v2/DashboardV2";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/mapgrowth";

export default function MapGrowthDashboardPage() {
  return <DashboardV2 exam={getExamV2("mapgrowth")} />;
}
