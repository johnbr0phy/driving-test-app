import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("crat");

export default function CratLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="crat" className="flex-1 flex flex-col">{children}</div>;
}
