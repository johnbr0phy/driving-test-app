import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cbspd");

export default function CbspdCspdtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cbspd" className="flex-1 flex flex-col">{children}</div>;
}
