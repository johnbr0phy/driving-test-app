import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hspachl");

export default function HspaChlLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hspachl" className="flex-1 flex flex-col">{children}</div>;
}
