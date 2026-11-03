import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nce");

export default function NceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nce" className="flex-1 flex flex-col">{children}</div>;
}
