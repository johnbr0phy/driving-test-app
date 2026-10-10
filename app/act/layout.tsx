import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { ACT } from "@/lib/v2/exams/act";

export const metadata: Metadata = {
  title: ACT.name,
  description: `Free full-length ${ACT.fullName} practice with real section timing and a 1 to 36 score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={ACT.theme}>{children}</V2Shell>;
}
