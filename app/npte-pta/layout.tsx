import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nptepta");

export default function NptePtaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nptepta" className="flex-1 flex flex-col">{children}</div>;
}
