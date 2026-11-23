import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { FAAIFR } from "@/lib/v2/exams/faaifr";

export const metadata: Metadata = examV2AppMetadata(FAAIFR);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={FAAIFR.theme}>{children}</V2Shell>;
}
