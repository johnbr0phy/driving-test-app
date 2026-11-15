import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TABE } from "@/lib/v2/exams/tabe";

export const metadata: Metadata = examV2AppMetadata(TABE);

export default function TabeLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TABE.theme}>{children}</V2Shell>;
}
