import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ptmoto");

export default function PtmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ptmoto" className="flex-1 flex flex-col">{children}</div>;
}
