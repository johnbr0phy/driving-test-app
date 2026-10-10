import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { HESI } from "@/lib/v2/exams/hesi";

export const metadata: Metadata = {
  title: HESI.name,
  description: `Free full-length ${HESI.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={HESI.theme}>{children}</V2Shell>;
}
