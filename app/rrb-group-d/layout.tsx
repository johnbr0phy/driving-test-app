import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { RRBGROUPD } from "@/lib/v2/exams/rrbgroupd";

export const metadata: Metadata = examV2AppMetadata(RRBGROUPD);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={RRBGROUPD.theme}>{children}</V2Shell>;
}
