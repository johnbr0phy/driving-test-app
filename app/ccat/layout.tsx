import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CCAT } from "@/lib/v2/exams/ccat";

export const metadata: Metadata = examV2AppMetadata(CCAT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CCAT.theme}>{children}</V2Shell>;
}
