import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { ASVAB } from "@/lib/v2/exams/asvab";

export const metadata: Metadata = {
  title: ASVAB.name,
  description: `Free full-length ${ASVAB.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ASVAB.theme}>{children}</V2Shell>;
}
