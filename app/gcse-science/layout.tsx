import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCSESCIENCE } from "@/lib/v2/exams/gcsescience";

export const metadata: Metadata = examV2AppMetadata(GCSESCIENCE);

export default function GcseScienceLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCSESCIENCE.theme}>{children}</V2Shell>;
}
