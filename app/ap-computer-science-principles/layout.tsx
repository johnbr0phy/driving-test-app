import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { APCSP } from "@/lib/v2/exams/apcsp";

export const metadata: Metadata = examV2AppMetadata(APCSP);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APCSP.theme}>{children}</V2Shell>;
}
