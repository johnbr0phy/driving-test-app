import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PRINCE2 } from "@/lib/v2/exams/prince2";

export const metadata: Metadata = examV2AppMetadata(PRINCE2);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PRINCE2.theme}>{children}</V2Shell>;
}
