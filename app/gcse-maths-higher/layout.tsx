import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCSEHIGHER } from "@/lib/v2/exams/gcsehigher";

export const metadata: Metadata = examV2AppMetadata(GCSEHIGHER);

export default function GcseHigherLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCSEHIGHER.theme}>{children}</V2Shell>;
}
