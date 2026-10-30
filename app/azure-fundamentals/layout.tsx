import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AZ900 } from "@/lib/v2/exams/az900";

export const metadata: Metadata = examV2AppMetadata(AZ900);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AZ900.theme}>{children}</V2Shell>;
}
