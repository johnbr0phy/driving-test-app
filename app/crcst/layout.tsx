import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("crcst");

export default function CRCSTLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="crcst" className="flex-1 flex flex-col">{children}</div>;
}
