import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NETPLUS } from "@/lib/v2/exams/netplus";

export const metadata: Metadata = examV2AppMetadata(NETPLUS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NETPLUS.theme}>{children}</V2Shell>;
}
