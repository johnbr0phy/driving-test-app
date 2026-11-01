import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JEEMAIN } from "@/lib/v2/exams/jeemain";

export const metadata: Metadata = examV2AppMetadata(JEEMAIN);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JEEMAIN.theme}>{children}</V2Shell>;
}
