import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { EQAO9 } from "@/lib/v2/exams/eqao9";

export const metadata: Metadata = examV2AppMetadata(EQAO9);

export default function Eqao9Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={EQAO9.theme}>{children}</V2Shell>;
}
