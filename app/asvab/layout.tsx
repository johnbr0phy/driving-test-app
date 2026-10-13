import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ASVAB } from "@/lib/v2/exams/asvab";

export const metadata: Metadata = examV2AppMetadata(ASVAB);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ASVAB.theme}>{children}</V2Shell>;
}
