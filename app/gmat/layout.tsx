import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { GMAT } from "@/lib/v2/exams/gmat";

export const metadata: Metadata = examV2AppMetadata(GMAT);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={GMAT.theme}>{children}</V2Shell>;
}
