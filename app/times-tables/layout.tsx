import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { TIMESTABLES } from "@/lib/v2/exams/timestables";

export const metadata: Metadata = examV2AppMetadata(TIMESTABLES);

export default function TimesTablesLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TIMESTABLES.theme}>{children}</V2Shell>;
}
