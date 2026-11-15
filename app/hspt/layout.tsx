import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { HSPT } from "@/lib/v2/exams/hspt";

export const metadata: Metadata = examV2AppMetadata(HSPT);

export default function HsptLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={HSPT.theme}>{children}</V2Shell>;
}
