import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { UPTET } from "@/lib/v2/exams/uptet";

export const metadata: Metadata = examV2AppMetadata(UPTET);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={UPTET.theme}>{children}</V2Shell>;
}
