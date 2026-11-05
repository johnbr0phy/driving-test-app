import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iepsa");

export default function IePsaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iepsa" className="flex-1 flex flex-col">{children}</div>;
}
