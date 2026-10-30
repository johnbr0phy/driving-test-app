import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PMP } from "@/lib/v2/exams/pmp";

export const metadata: Metadata = examV2AppMetadata(PMP);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PMP.theme}>{children}</V2Shell>;
}
