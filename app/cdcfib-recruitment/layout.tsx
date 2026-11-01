import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cdcfib");

export default function CdcfibLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cdcfib" className="flex-1 flex flex-col">{children}</div>;
}
