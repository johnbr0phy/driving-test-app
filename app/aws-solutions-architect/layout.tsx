import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AWSSAA } from "@/lib/v2/exams/awssaa";

export const metadata: Metadata = examV2AppMetadata(AWSSAA);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AWSSAA.theme}>{children}</V2Shell>;
}
