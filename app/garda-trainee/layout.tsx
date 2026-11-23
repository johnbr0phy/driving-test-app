import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { IEGARDA } from "@/lib/v2/exams/iegarda";

export const metadata: Metadata = examV2AppMetadata(IEGARDA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={IEGARDA.theme}>{children}</V2Shell>;
}
