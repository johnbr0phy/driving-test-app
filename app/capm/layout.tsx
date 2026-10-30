import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CAPM } from "@/lib/v2/exams/capm";

export const metadata: Metadata = examV2AppMetadata(CAPM);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CAPM.theme}>{children}</V2Shell>;
}
