import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rpt");

export default function RptLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rpt" className="flex-1 flex flex-col">{children}</div>;
}
