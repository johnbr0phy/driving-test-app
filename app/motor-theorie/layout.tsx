import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nlmoto");

export default function NlmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nlmoto" className="flex-1 flex flex-col">{children}</div>;
}
