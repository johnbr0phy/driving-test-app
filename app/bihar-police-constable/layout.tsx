import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { BIHARPOLICE } from "@/lib/v2/exams/biharpolice";

export const metadata: Metadata = examV2AppMetadata(BIHARPOLICE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={BIHARPOLICE.theme}>{children}</V2Shell>;
}
