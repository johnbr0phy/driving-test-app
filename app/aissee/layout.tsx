import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AISSEE } from "@/lib/v2/exams/aissee";

export const metadata: Metadata = examV2AppMetadata(AISSEE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AISSEE.theme}>{children}</V2Shell>;
}
