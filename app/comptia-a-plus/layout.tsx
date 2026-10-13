import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { APLUS } from "@/lib/v2/exams/aplus";

export const metadata: Metadata = {
  title: APLUS.name,
  description: `Free full-length ${APLUS.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={APLUS.theme}>{children}</V2Shell>;
}
