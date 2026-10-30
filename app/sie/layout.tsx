import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sie");

export default function SieLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sie" className="flex-1 flex flex-col">{children}</div>;
}
