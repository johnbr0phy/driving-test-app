import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSCP } from "@/lib/v2/exams/sscp";

export const metadata: Metadata = examV2AppMetadata(SSCP);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSCP.theme}>{children}</V2Shell>;
}
