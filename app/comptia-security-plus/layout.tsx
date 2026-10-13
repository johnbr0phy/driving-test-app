import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { SECPLUS } from "@/lib/v2/exams/secplus";

export const metadata: Metadata = {
  title: SECPLUS.name,
  description: `Free full-length ${SECPLUS.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SECPLUS.theme}>{children}</V2Shell>;
}
