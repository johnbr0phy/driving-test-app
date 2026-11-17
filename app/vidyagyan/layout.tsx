import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { VIDYAGYAN } from "@/lib/v2/exams/vidyagyan";

export const metadata: Metadata = examV2AppMetadata(VIDYAGYAN);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={VIDYAGYAN.theme}>{children}</V2Shell>;
}
