import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NCLEXPN } from "@/lib/v2/exams/nclexpn";

export const metadata: Metadata = examV2AppMetadata(NCLEXPN);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NCLEXPN.theme}>{children}</V2Shell>;
}
