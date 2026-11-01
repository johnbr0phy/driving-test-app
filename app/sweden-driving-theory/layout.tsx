import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("setrafik");

export default function SetrafikLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="setrafik" className="flex-1 flex flex-col">{children}</div>;
}
