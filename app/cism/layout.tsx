import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CISM } from "@/lib/v2/exams/cism";

export const metadata: Metadata = examV2AppMetadata(CISM);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CISM.theme}>{children}</V2Shell>;
}
