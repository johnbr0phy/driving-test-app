import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GCDL } from "@/lib/v2/exams/gcdl";

export const metadata: Metadata = examV2AppMetadata(GCDL);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GCDL.theme}>{children}</V2Shell>;
}
