import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSCGD } from "@/lib/v2/exams/sscgd";

export const metadata: Metadata = examV2AppMetadata(SSCGD);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSCGD.theme}>{children}</V2Shell>;
}
