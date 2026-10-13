import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { AWS } from "@/lib/v2/exams/aws";

export const metadata: Metadata = {
  title: AWS.name,
  description: `Free full-length ${AWS.fullName} practice with real section timing and a score estimate, plus skill drills sized for your phone.`,
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AWS.theme}>{children}</V2Shell>;
}
