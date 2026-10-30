import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { FAAPVT } from "@/lib/v2/exams/faapvt";

export const metadata: Metadata = examV2AppMetadata(FAAPVT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={FAAPVT.theme}>{children}</V2Shell>;
}
