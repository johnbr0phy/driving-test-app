import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSCMTS } from "@/lib/v2/exams/sscmts";

export const metadata: Metadata = examV2AppMetadata(SSCMTS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSCMTS.theme}>{children}</V2Shell>;
}
