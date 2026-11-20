import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { CCNPENCOR } from "@/lib/v2/exams/ccnpencor";

export const metadata: Metadata = examV2AppMetadata(CCNPENCOR);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={CCNPENCOR.theme}>{children}</V2Shell>;
}
