import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { MAPGROWTH } from "@/lib/v2/exams/mapgrowth";

export const metadata: Metadata = examV2AppMetadata(MAPGROWTH);

export default function MapGrowthLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={MAPGROWTH.theme}>{children}</V2Shell>;
}
