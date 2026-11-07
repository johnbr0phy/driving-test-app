import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mtmoto");

export default function MtmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mtmoto" className="flex-1 flex flex-col">{children}</div>;
}
