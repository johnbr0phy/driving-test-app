import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caab");

export default function CaabLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caab" className="flex-1 flex flex-col">{children}</div>;
}
