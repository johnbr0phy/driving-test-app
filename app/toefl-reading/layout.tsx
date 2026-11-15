import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TOEFLREAD } from "@/lib/v2/exams/toeflread";

export const metadata: Metadata = examV2AppMetadata(TOEFLREAD);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TOEFLREAD.theme}>{children}</V2Shell>;
}
