import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ausecurity");

export default function AuSecurityLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ausecurity" className="flex-1 flex flex-col">{children}</div>;
}
