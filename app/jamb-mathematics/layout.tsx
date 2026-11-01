import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JAMBMATH } from "@/lib/v2/exams/jambmath";

export const metadata: Metadata = examV2AppMetadata(JAMBMATH);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JAMBMATH.theme}>{children}</V2Shell>;
}
