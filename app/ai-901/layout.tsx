import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AI901 } from "@/lib/v2/exams/ai901";

export const metadata: Metadata = examV2AppMetadata(AI901);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AI901.theme}>{children}</V2Shell>;
}
