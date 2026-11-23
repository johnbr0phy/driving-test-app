import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TECHPLUS } from "@/lib/v2/exams/techplus";

export const metadata: Metadata = examV2AppMetadata(TECHPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TECHPLUS.theme}>{children}</V2Shell>;
}
