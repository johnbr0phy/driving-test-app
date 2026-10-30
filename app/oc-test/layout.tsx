import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { OCNSW } from "@/lib/v2/exams/ocnsw";

export const metadata: Metadata = examV2AppMetadata(OCNSW);

export default function OcNswLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={OCNSW.theme}>{children}</V2Shell>;
}
