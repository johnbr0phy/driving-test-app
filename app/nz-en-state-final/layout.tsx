import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NZENSF } from "@/lib/v2/exams/nzensf";

export const metadata: Metadata = examV2AppMetadata(NZENSF);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NZENSF.theme}>{children}</V2Shell>;
}
