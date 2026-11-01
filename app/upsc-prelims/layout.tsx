import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { UPSCSE } from "@/lib/v2/exams/upscse";

export const metadata: Metadata = examV2AppMetadata(UPSCSE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={UPSCSE.theme}>{children}</V2Shell>;
}
