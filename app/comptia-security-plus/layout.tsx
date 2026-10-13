import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SECPLUS } from "@/lib/v2/exams/secplus";

export const metadata: Metadata = examV2AppMetadata(SECPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SECPLUS.theme}>{children}</V2Shell>;
}
