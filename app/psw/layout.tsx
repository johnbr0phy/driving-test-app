import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("capsw");

export default function CapswLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="capsw" className="flex-1 flex flex-col">{children}</div>;
}
