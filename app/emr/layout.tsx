import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { EMR } from "@/lib/v2/exams/emr";

export const metadata: Metadata = examV2AppMetadata(EMR);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={EMR.theme}>{children}</V2Shell>;
}
