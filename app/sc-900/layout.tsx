import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { SC900 } from "@/lib/v2/exams/sc900";

export const metadata: Metadata = examV2AppMetadata(SC900);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SC900.theme}>{children}</V2Shell>;
}
