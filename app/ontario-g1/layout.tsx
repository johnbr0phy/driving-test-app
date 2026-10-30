import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caon");

export default function CaonLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caon" className="flex-1 flex flex-col">{children}</div>;
}
