import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NSWSEL } from "@/lib/v2/exams/nswsel";

export const metadata: Metadata = examV2AppMetadata(NSWSEL);

export default function NswSelLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NSWSEL.theme}>{children}</V2Shell>;
}
