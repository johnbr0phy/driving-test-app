import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { MPPOLICE } from "@/lib/v2/exams/mppolice";

export const metadata: Metadata = examV2AppMetadata(MPPOLICE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={MPPOLICE.theme}>{children}</V2Shell>;
}
