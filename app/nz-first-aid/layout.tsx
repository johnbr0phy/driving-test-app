import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzfirstaid");

export default function NzFirstAidLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzfirstaid" className="flex-1 flex flex-col">{children}</div>;
}
