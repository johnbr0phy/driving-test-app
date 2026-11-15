import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bcaba");

export default function BcabaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bcaba" className="flex-1 flex flex-col">{children}</div>;
}
