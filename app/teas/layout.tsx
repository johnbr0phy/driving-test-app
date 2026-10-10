import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { TEAS } from "@/lib/v2/exams/teas";

export const metadata: Metadata = {
  title: TEAS.name,
  description: `Free full-length ${TEAS.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={TEAS.theme}>{children}</V2Shell>;
}
