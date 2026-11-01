import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { UPPOLICE } from "@/lib/v2/exams/uppolice";

export const metadata: Metadata = examV2AppMetadata(UPPOLICE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={UPPOLICE.theme}>{children}</V2Shell>;
}
