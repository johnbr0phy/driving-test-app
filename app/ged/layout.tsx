import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GED } from "@/lib/v2/exams/ged";

export const metadata: Metadata = examV2AppMetadata(GED);

export default function GedLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GED.theme}>{children}</V2Shell>;
}
