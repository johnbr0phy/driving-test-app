import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ISTQB } from "@/lib/v2/exams/istqb";

export const metadata: Metadata = examV2AppMetadata(ISTQB);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ISTQB.theme}>{children}</V2Shell>;
}
