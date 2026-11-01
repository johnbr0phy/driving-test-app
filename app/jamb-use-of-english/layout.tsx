import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JAMBENG } from "@/lib/v2/exams/jambeng";

export const metadata: Metadata = examV2AppMetadata(JAMBENG);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JAMBENG.theme}>{children}</V2Shell>;
}
