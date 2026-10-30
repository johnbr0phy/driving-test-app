import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ELEVENPLUS } from "@/lib/v2/exams/elevenplus";

export const metadata: Metadata = examV2AppMetadata(ELEVENPLUS);

export default function ElevenPlusLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ELEVENPLUS.theme}>{children}</V2Shell>;
}
