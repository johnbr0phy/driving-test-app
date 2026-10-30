import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { KS2 } from "@/lib/v2/exams/ks2";

export const metadata: Metadata = examV2AppMetadata(KS2);

export default function Ks2Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={KS2.theme}>{children}</V2Shell>;
}
