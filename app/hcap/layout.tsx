import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iehcap");

export default function IeHcapLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iehcap" className="flex-1 flex flex-col">{children}</div>;
}
