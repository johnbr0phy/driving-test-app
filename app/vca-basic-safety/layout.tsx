import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nlvca");

export default function NlVcaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nlvca" className="flex-1 flex flex-col">{children}</div>;
}
