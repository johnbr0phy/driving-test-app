import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auwah");

export default function AuwahLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auwah" className="flex-1 flex flex-col">{children}</div>;
}
