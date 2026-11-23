import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { FAACAX } from "@/lib/v2/exams/faacax";

export const metadata: Metadata = examV2AppMetadata(FAACAX);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={FAACAX.theme}>{children}</V2Shell>;
}
