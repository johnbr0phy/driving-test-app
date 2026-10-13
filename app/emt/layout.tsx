import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { EMT } from "@/lib/v2/exams/emt";

export const metadata: Metadata = examV2AppMetadata(EMT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={EMT.theme}>{children}</V2Shell>;
}
