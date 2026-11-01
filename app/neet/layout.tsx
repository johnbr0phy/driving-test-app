import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NEET } from "@/lib/v2/exams/neet";

export const metadata: Metadata = examV2AppMetadata(NEET);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NEET.theme}>{children}</V2Shell>;
}
