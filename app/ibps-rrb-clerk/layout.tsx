import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { IBPSRRB } from "@/lib/v2/exams/ibpsrrb";

export const metadata: Metadata = examV2AppMetadata(IBPSRRB);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={IBPSRRB.theme}>{children}</V2Shell>;
}
