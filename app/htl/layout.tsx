import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("htl");

export default function HTLLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="htl" className="flex-1 flex flex-col">{children}</div>;
}
