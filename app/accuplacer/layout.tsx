import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { ACCUPLACER } from "@/lib/v2/exams/accuplacer";

export const metadata: Metadata = {
  title: ACCUPLACER.name,
  description: `Free full-length ${ACCUPLACER.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ACCUPLACER.theme}>{children}</V2Shell>;
}
