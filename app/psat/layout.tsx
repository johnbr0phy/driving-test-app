import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PSAT } from "@/lib/v2/exams/psat";

export const metadata: Metadata = examV2AppMetadata(PSAT);

export default function PsatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PSAT.theme}>{children}</V2Shell>;
}
