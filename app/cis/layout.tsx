import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hspacis");

export default function HspaCisLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hspacis" className="flex-1 flex flex-col">{children}</div>;
}
