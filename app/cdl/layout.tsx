import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cdl");

export default function CDLLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cdl" className="flex-1 flex flex-col">{children}</div>;
}
