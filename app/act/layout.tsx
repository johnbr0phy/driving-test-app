import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ACT } from "@/lib/v2/exams/act";

export const metadata: Metadata = examV2AppMetadata(ACT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ACT.theme}>{children}</V2Shell>;
}
