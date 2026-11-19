import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ITCILSB2 } from "@/lib/v2/exams/itcilsb2";

export const metadata: Metadata = examV2AppMetadata(ITCILSB2);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ITCILSB2.theme} language={ITCILSB2.language}>{children}</V2Shell>;
}
