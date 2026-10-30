import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GRE } from "@/lib/v2/exams/gre";

export const metadata: Metadata = examV2AppMetadata(GRE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GRE.theme}>{children}</V2Shell>;
}
