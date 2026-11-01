import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phlet");

export default function PhletLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phlet" className="flex-1 flex flex-col">{children}</div>;
}
