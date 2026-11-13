import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCPPCA } from "@/lib/v2/exams/gcppca";

export const metadata: Metadata = examV2AppMetadata(GCPPCA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCPPCA.theme}>{children}</V2Shell>;
}
