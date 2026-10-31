import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phlto");

export default function PhltoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phlto" className="flex-1 flex flex-col">{children}</div>;
}
