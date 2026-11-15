import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { WONDERLIC } from "@/lib/v2/exams/wonderlic";

export const metadata: Metadata = examV2AppMetadata(WONDERLIC);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={WONDERLIC.theme}>{children}</V2Shell>;
}
