import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SEHP } from "@/lib/v2/exams/sehp";

export const metadata: Metadata = examV2AppMetadata(SEHP);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SEHP.theme}>{children}</V2Shell>;
}
