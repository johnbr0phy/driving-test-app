import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { NAPLEX } from "@/lib/v2/exams/naplex";

export const metadata: Metadata = examV2AppMetadata(NAPLEX);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NAPLEX.theme}>{children}</V2Shell>;
}
