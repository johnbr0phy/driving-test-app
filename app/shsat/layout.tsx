import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SHSAT } from "@/lib/v2/exams/shsat";

export const metadata: Metadata = examV2AppMetadata(SHSAT);

export default function ShsatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SHSAT.theme}>{children}</V2Shell>;
}
