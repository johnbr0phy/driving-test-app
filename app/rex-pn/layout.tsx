import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { REXPN } from "@/lib/v2/exams/rexpn";

export const metadata: Metadata = examV2AppMetadata(REXPN);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={REXPN.theme}>{children}</V2Shell>;
}
