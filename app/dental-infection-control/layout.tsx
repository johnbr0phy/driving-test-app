import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("danbice");

export default function DanbiceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="danbice" className="flex-1 flex flex-col">{children}</div>;
}
