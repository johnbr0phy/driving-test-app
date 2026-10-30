import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CTET } from "@/lib/v2/exams/ctet";

export const metadata: Metadata = examV2AppMetadata(CTET);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CTET.theme}>{children}</V2Shell>;
}
