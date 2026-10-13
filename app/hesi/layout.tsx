import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { HESI } from "@/lib/v2/exams/hesi";

export const metadata: Metadata = examV2AppMetadata(HESI);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={HESI.theme}>{children}</V2Shell>;
}
