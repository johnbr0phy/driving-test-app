import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { VICSEL } from "@/lib/v2/exams/vicsel";

export const metadata: Metadata = examV2AppMetadata(VICSEL);

export default function VicSelLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={VICSEL.theme}>{children}</V2Shell>;
}
