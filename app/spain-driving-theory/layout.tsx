import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("esdgt");

export default function EsdgtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="esdgt" className="flex-1 flex flex-col">{children}</div>;
}
