import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ITCILS } from "@/lib/v2/exams/itcils";

export const metadata: Metadata = examV2AppMetadata(ITCILS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ITCILS.theme} language={ITCILS.language}>{children}</V2Shell>;
}
