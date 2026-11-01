import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { DELHIPOLICE } from "@/lib/v2/exams/delhipolice";

export const metadata: Metadata = examV2AppMetadata(DELHIPOLICE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={DELHIPOLICE.theme}>{children}</V2Shell>;
}
