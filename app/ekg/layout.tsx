import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cet");

export default function CetLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cet" className="flex-1 flex flex-col">{children}</div>;
}
