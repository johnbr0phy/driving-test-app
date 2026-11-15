import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { STAARENG1 } from "@/lib/v2/exams/staareng1";

export const metadata: Metadata = examV2AppMetadata(STAARENG1);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={STAARENG1.theme}>{children}</V2Shell>;
}
