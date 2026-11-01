import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NDA } from "@/lib/v2/exams/nda";

export const metadata: Metadata = examV2AppMetadata(NDA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NDA.theme}>{children}</V2Shell>;
}
