import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { JAMBPHYS } from "@/lib/v2/exams/jambphys";

export const metadata: Metadata = examV2AppMetadata(JAMBPHYS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={JAMBPHYS.theme}>{children}</V2Shell>;
}
