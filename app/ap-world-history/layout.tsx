import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { APWORLD } from "@/lib/v2/exams/apworld";

export const metadata: Metadata = examV2AppMetadata(APWORLD);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APWORLD.theme}>{children}</V2Shell>;
}
