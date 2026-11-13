import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aafcs");

export default function AafcsHnfsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aafcs" className="flex-1 flex flex-col">{children}</div>;
}
