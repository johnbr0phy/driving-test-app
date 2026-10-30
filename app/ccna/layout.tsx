import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CCNA } from "@/lib/v2/exams/ccna";

export const metadata: Metadata = examV2AppMetadata(CCNA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CCNA.theme}>{children}</V2Shell>;
}
