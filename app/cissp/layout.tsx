import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CISSP } from "@/lib/v2/exams/cissp";

export const metadata: Metadata = examV2AppMetadata(CISSP);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CISSP.theme}>{children}</V2Shell>;
}
