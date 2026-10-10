import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cst");

export default function CSTLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cst" className="flex-1 flex flex-col">{children}</div>;
}
