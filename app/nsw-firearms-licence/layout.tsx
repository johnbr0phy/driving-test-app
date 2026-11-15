import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufirearmsnsw");

export default function NswFirearmsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufirearmsnsw" className="flex-1 flex flex-col">{children}</div>;
}
