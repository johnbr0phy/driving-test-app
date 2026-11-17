import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JAMBLIT } from "@/lib/v2/exams/jamblit";

export const metadata: Metadata = examV2AppMetadata(JAMBLIT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JAMBLIT.theme}>{children}</V2Shell>;
}
