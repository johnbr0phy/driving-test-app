import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSCCPO } from "@/lib/v2/exams/ssccpo";

export const metadata: Metadata = examV2AppMetadata(SSCCPO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSCCPO.theme}>{children}</V2Shell>;
}
