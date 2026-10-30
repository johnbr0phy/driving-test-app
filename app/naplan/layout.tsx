import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NAPLAN } from "@/lib/v2/exams/naplan";

export const metadata: Metadata = examV2AppMetadata(NAPLAN);

export default function NaplanLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NAPLAN.theme}>{children}</V2Shell>;
}
