import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { IBPSCLERK } from "@/lib/v2/exams/ibpsclerk";

export const metadata: Metadata = examV2AppMetadata(IBPSCLERK);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={IBPSCLERK.theme}>{children}</V2Shell>;
}
