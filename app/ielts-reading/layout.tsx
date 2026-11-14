import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { IELTSREAD } from "@/lib/v2/exams/ieltsread";

export const metadata: Metadata = examV2AppMetadata(IELTSREAD);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={IELTSREAD.theme}>{children}</V2Shell>;
}
