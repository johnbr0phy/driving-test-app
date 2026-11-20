import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PSPO } from "@/lib/v2/exams/pspo";

export const metadata: Metadata = examV2AppMetadata(PSPO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PSPO.theme}>{children}</V2Shell>;
}
