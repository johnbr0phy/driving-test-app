import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SBICLERK } from "@/lib/v2/exams/sbiclerk";

export const metadata: Metadata = examV2AppMetadata(SBICLERK);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SBICLERK.theme}>{children}</V2Shell>;
}
