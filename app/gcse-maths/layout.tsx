import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCSEMATHS } from "@/lib/v2/exams/gcsemaths";

export const metadata: Metadata = examV2AppMetadata(GCSEMATHS);

export default function GcseMathsLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCSEMATHS.theme}>{children}</V2Shell>;
}
