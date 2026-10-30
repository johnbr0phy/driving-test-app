import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpc");

export default function CpcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpc" className="flex-1 flex flex-col">{children}</div>;
}
