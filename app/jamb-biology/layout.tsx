import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JAMBBIO } from "@/lib/v2/exams/jambbio";

export const metadata: Metadata = examV2AppMetadata(JAMBBIO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JAMBBIO.theme}>{children}</V2Shell>;
}
