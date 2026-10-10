import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aplus");

export default function AplusLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aplus" className="flex-1 flex flex-col">{children}</div>;
}
