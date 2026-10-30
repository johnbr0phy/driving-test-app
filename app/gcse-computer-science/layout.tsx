import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCSECS } from "@/lib/v2/exams/gcsecs";

export const metadata: Metadata = examV2AppMetadata(GCSECS);

export default function GcsecsLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCSECS.theme}>{children}</V2Shell>;
}
