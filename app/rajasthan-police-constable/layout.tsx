import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { RAJPOLICE } from "@/lib/v2/exams/rajpolice";

export const metadata: Metadata = examV2AppMetadata(RAJPOLICE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={RAJPOLICE.theme}>{children}</V2Shell>;
}
