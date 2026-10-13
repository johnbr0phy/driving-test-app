import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NCLEX } from "@/lib/v2/exams/nclex";

export const metadata: Metadata = examV2AppMetadata(NCLEX);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NCLEX.theme}>{children}</V2Shell>;
}
