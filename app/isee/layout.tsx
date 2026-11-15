import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ISEE } from "@/lib/v2/exams/isee";

export const metadata: Metadata = examV2AppMetadata(ISEE);

export default function IseeLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ISEE.theme}>{children}</V2Shell>;
}
