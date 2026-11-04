import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cisa");

export default function CisaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cisa" className="flex-1 flex flex-col">{children}</div>;
}
