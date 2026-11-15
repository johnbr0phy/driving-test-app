import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { WASSCEENG } from "@/lib/v2/exams/wassceeng";

export const metadata: Metadata = examV2AppMetadata(WASSCEENG);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={WASSCEENG.theme}>{children}</V2Shell>;
}
