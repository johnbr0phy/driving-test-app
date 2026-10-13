import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SAT } from "@/lib/v2/exams/sat";

export const metadata: Metadata = examV2AppMetadata(SAT);

export default function SatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SAT.theme}>{children}</V2Shell>;
}
