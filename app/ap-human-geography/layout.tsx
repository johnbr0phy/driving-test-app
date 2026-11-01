import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { APHUG } from "@/lib/v2/exams/aphug";

export const metadata: Metadata = examV2AppMetadata(APHUG);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APHUG.theme}>{children}</V2Shell>;
}
