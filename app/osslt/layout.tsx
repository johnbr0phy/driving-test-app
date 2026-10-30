import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { OSSLT } from "@/lib/v2/exams/osslt";

export const metadata: Metadata = examV2AppMetadata(OSSLT);

export default function OssltLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={OSSLT.theme}>{children}</V2Shell>;
}
