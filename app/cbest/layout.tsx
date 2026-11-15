import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CBEST } from "@/lib/v2/exams/cbest";

export const metadata: Metadata = examV2AppMetadata(CBEST);

export default function CbestLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CBEST.theme}>{children}</V2Shell>;
}
