import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cbcs");

export default function CbcsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cbcs" className="flex-1 flex flex-col">{children}</div>;
}
