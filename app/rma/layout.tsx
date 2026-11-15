import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rma");

export default function RmaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rma" className="flex-1 flex flex-col">{children}</div>;
}
