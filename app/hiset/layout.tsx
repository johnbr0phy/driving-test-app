import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { HISET } from "@/lib/v2/exams/hiset";

export const metadata: Metadata = examV2AppMetadata(HISET);

export default function HisetLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={HISET.theme}>{children}</V2Shell>;
}
