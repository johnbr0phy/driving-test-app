import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NAPLAN7 } from "@/lib/v2/exams/naplan7";

export const metadata: Metadata = examV2AppMetadata(NAPLAN7);

export default function Naplan7Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NAPLAN7.theme}>{children}</V2Shell>;
}
