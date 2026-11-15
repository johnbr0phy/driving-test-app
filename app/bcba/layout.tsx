import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bcba");

export default function BcbaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bcba" className="flex-1 flex flex-col">{children}</div>;
}
