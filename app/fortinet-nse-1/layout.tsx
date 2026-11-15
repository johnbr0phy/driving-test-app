import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { FORTINSE } from "@/lib/v2/exams/fortinse";

export const metadata: Metadata = examV2AppMetadata(FORTINSE);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={FORTINSE.theme}>{children}</V2Shell>;
}
