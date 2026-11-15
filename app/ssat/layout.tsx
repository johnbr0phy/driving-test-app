import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSAT } from "@/lib/v2/exams/ssat";

export const metadata: Metadata = examV2AppMetadata(SSAT);

export default function SsatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSAT.theme}>{children}</V2Shell>;
}
