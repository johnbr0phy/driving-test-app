import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CEH } from "@/lib/v2/exams/ceh";

export const metadata: Metadata = examV2AppMetadata(CEH);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CEH.theme}>{children}</V2Shell>;
}
