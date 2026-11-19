import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ITCELI } from "@/lib/v2/exams/itceli";

export const metadata: Metadata = examV2AppMetadata(ITCELI);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ITCELI.theme} language={ITCELI.language}>{children}</V2Shell>;
}
