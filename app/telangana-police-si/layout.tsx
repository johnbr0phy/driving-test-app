import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TGSI } from "@/lib/v2/exams/tgsi";

export const metadata: Metadata = examV2AppMetadata(TGSI);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TGSI.theme}>{children}</V2Shell>;
}
