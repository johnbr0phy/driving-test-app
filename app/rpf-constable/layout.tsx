import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { RPFCONST } from "@/lib/v2/exams/rpfconst";

export const metadata: Metadata = examV2AppMetadata(RPFCONST);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={RPFCONST.theme}>{children}</V2Shell>;
}
