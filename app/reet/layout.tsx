import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { REET } from "@/lib/v2/exams/reet";

export const metadata: Metadata = examV2AppMetadata(REET);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={REET.theme}>{children}</V2Shell>;
}
