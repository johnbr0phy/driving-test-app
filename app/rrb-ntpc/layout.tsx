import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { RRBNTPC } from "@/lib/v2/exams/rrbntpc";

export const metadata: Metadata = examV2AppMetadata(RRBNTPC);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={RRBNTPC.theme}>{children}</V2Shell>;
}
