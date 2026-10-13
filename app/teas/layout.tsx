import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TEAS } from "@/lib/v2/exams/teas";

export const metadata: Metadata = examV2AppMetadata(TEAS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TEAS.theme}>{children}</V2Shell>;
}
