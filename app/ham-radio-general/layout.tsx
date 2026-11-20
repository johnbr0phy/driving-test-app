import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hamgeneral");

export default function HamgeneralLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hamgeneral" className="flex-1 flex flex-col">{children}</div>;
}
