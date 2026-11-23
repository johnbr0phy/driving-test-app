import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { INRRN } from "@/lib/v2/exams/inrrn";

export const metadata: Metadata = examV2AppMetadata(INRRN);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={INRRN.theme}>{children}</V2Shell>;
}
