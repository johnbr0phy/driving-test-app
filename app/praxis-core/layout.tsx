import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PRAXIS } from "@/lib/v2/exams/praxis";

export const metadata: Metadata = examV2AppMetadata(PRAXIS);

export default function PraxisLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PRAXIS.theme}>{children}</V2Shell>;
}
