import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { MCAT } from "@/lib/v2/exams/mcat";

export const metadata: Metadata = examV2AppMetadata(MCAT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={MCAT.theme}>{children}</V2Shell>;
}
