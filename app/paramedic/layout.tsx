import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PARAMEDIC } from "@/lib/v2/exams/paramedic";

export const metadata: Metadata = examV2AppMetadata(PARAMEDIC);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PARAMEDIC.theme}>{children}</V2Shell>;
}
