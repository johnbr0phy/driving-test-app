import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { APGOV } from "@/lib/v2/exams/apgov";

export const metadata: Metadata = examV2AppMetadata(APGOV);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APGOV.theme}>{children}</V2Shell>;
}
