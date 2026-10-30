import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("inrto");

export default function InrtoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="inrto" className="flex-1 flex flex-col">{children}</div>;
}
