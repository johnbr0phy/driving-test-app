import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("natecore");

export default function NateCoreLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="natecore" className="flex-1 flex flex-col">{children}</div>;
}
