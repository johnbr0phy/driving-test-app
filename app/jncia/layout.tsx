import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JNCIA } from "@/lib/v2/exams/jncia";

export const metadata: Metadata = examV2AppMetadata(JNCIA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JNCIA.theme}>{children}</V2Shell>;
}
