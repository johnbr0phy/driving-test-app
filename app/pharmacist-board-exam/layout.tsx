import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phpharm");

export default function PhpharmLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phpharm" className="flex-1 flex flex-col">{children}</div>;
}
