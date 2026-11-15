import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { DAT } from "@/lib/v2/exams/dat";

export const metadata: Metadata = examV2AppMetadata(DAT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={DAT.theme}>{children}</V2Shell>;
}
