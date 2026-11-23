import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CCST } from "@/lib/v2/exams/ccst";

export const metadata: Metadata = examV2AppMetadata(CCST);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CCST.theme}>{children}</V2Shell>;
}
