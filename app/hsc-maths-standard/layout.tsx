import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { HSCMATHS } from "@/lib/v2/exams/hscmaths";

export const metadata: Metadata = examV2AppMetadata(HSCMATHS);

export default function HscMathsLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={HSCMATHS.theme}>{children}</V2Shell>;
}
