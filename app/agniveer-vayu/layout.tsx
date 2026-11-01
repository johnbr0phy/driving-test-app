import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AGNIVEERVAYU } from "@/lib/v2/exams/agniveervayu";

export const metadata: Metadata = examV2AppMetadata(AGNIVEERVAYU);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AGNIVEERVAYU.theme}>{children}</V2Shell>;
}
