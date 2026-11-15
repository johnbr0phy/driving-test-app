import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { COGAT } from "@/lib/v2/exams/cogat";

export const metadata: Metadata = examV2AppMetadata(COGAT);

export default function CogatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={COGAT.theme}>{children}</V2Shell>;
}
