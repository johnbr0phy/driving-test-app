import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { WASSCEMATH } from "@/lib/v2/exams/wasscemath";

export const metadata: Metadata = examV2AppMetadata(WASSCEMATH);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={WASSCEMATH.theme}>{children}</V2Shell>;
}
