import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { ITA2 } from "@/lib/v2/exams/ita2";

export const metadata: Metadata = examV2AppMetadata(ITA2);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ITA2.theme} language={ITA2.language}>{children}</V2Shell>;
}
