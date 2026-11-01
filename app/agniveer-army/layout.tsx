import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AGNIVEER } from "@/lib/v2/exams/agniveer";

export const metadata: Metadata = examV2AppMetadata(AGNIVEER);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AGNIVEER.theme}>{children}</V2Shell>;
}
