import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { PROJECTPLUS } from "@/lib/v2/exams/projectplus";

export const metadata: Metadata = examV2AppMetadata(PROJECTPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={PROJECTPLUS.theme}>{children}</V2Shell>;
}
