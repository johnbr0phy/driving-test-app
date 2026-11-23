import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SNOWPRO } from "@/lib/v2/exams/snowpro";

export const metadata: Metadata = examV2AppMetadata(SNOWPRO);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SNOWPRO.theme}>{children}</V2Shell>;
}
