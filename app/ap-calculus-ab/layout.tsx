import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { APCALCAB } from "@/lib/v2/exams/apcalcab";

export const metadata: Metadata = examV2AppMetadata(APCALCAB);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APCALCAB.theme}>{children}</V2Shell>;
}
