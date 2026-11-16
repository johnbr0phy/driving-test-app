import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cacore");

export default function BcCoreLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cacore" className="flex-1 flex flex-col">{children}</div>;
}
