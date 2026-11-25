import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { QUDURAT } from "@/lib/v2/exams/qudurat";

export const metadata: Metadata = examV2AppMetadata(QUDURAT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={QUDURAT.theme}>{children}</V2Shell>;
}
