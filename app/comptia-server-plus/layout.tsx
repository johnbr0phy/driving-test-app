import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SERVERPLUS } from "@/lib/v2/exams/serverplus";

export const metadata: Metadata = examV2AppMetadata(SERVERPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SERVERPLUS.theme}>{children}</V2Shell>;
}
