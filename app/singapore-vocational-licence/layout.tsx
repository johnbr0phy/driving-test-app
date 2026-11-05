import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgvl");

export default function SgvlLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgvl" className="flex-1 flex flex-col">{children}</div>;
}
