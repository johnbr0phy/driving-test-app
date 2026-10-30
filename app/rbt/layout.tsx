import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rbt");

export default function RbtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rbt" className="flex-1 flex flex-col">{children}</div>;
}
