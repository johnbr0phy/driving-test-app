import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AFOQT } from "@/lib/v2/exams/afoqt";

export const metadata: Metadata = examV2AppMetadata(AFOQT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AFOQT.theme}>{children}</V2Shell>;
}
