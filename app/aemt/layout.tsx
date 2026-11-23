import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AEMT } from "@/lib/v2/exams/aemt";

export const metadata: Metadata = examV2AppMetadata(AEMT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AEMT.theme}>{children}</V2Shell>;
}
