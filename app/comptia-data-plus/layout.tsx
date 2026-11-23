import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { DATAPLUS } from "@/lib/v2/exams/dataplus";

export const metadata: Metadata = examV2AppMetadata(DATAPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={DATAPLUS.theme}>{children}</V2Shell>;
}
