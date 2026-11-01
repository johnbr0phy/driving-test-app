import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SBIPO } from "@/lib/v2/exams/sbipo";

export const metadata: Metadata = examV2AppMetadata(SBIPO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SBIPO.theme}>{children}</V2Shell>;
}
