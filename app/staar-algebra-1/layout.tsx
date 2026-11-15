import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { STAARALG1 } from "@/lib/v2/exams/staaralg1";

export const metadata: Metadata = examV2AppMetadata(STAARALG1);

export default function StaarAlgebra1Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={STAARALG1.theme}>{children}</V2Shell>;
}
