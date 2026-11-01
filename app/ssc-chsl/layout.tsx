import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SSCCHSL } from "@/lib/v2/exams/sscchsl";

export const metadata: Metadata = examV2AppMetadata(SSCCHSL);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SSCCHSL.theme}>{children}</V2Shell>;
}
