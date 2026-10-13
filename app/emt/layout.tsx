import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { EMT } from "@/lib/v2/exams/emt";

export const metadata: Metadata = {
  title: EMT.name,
  description: `Free full-length ${EMT.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={EMT.theme}>{children}</V2Shell>;
}
