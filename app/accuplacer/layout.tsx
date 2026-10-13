import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ACCUPLACER } from "@/lib/v2/exams/accuplacer";

export const metadata: Metadata = examV2AppMetadata(ACCUPLACER);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ACCUPLACER.theme}>{children}</V2Shell>;
}
