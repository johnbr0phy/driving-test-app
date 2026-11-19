import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SFAPPBUILDER } from "@/lib/v2/exams/sfappbuilder";

export const metadata: Metadata = examV2AppMetadata(SFAPPBUILDER);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SFAPPBUILDER.theme}>{children}</V2Shell>;
}
