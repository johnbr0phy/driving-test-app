import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ccs");

export default function CcsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ccs" className="flex-1 flex flex-col">{children}</div>;
}
