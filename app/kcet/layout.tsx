import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { KCET } from "@/lib/v2/exams/kcet";

export const metadata: Metadata = examV2AppMetadata(KCET);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={KCET.theme}>{children}</V2Shell>;
}
