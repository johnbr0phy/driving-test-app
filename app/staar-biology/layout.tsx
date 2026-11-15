import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { STAARBIO } from "@/lib/v2/exams/staarbio";

export const metadata: Metadata = examV2AppMetadata(STAARBIO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={STAARBIO.theme}>{children}</V2Shell>;
}
