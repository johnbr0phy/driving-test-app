import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { NCLEX } from "@/lib/v2/exams/nclex";

export const metadata: Metadata = {
  title: NCLEX.name,
  description: `Free full-length ${NCLEX.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={NCLEX.theme}>{children}</V2Shell>;
}
