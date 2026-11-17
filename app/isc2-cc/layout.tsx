import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ISC2CC } from "@/lib/v2/exams/isc2cc";

export const metadata: Metadata = examV2AppMetadata(ISC2CC);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ISC2CC.theme}>{children}</V2Shell>;
}
