import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgftt");

export default function SgfttLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgftt" className="flex-1 flex flex-col">{children}</div>;
}
