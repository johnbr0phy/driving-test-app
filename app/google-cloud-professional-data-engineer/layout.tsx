import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCPPDE } from "@/lib/v2/exams/gcppde";

export const metadata: Metadata = examV2AppMetadata(GCPPDE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCPPDE.theme}>{children}</V2Shell>;
}
