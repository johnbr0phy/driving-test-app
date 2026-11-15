import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mace");

export default function MaceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mace" className="flex-1 flex flex-col">{children}</div>;
}
