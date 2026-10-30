import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { FSMATHS } from "@/lib/v2/exams/fsmaths";

export const metadata: Metadata = examV2AppMetadata(FSMATHS);

export default function FsMathsLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={FSMATHS.theme}>{children}</V2Shell>;
}
