import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ITIL } from "@/lib/v2/exams/itil";

export const metadata: Metadata = examV2AppMetadata(ITIL);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ITIL.theme}>{children}</V2Shell>;
}
