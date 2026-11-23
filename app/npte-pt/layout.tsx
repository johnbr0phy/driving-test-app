import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nptept");

export default function NptePtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nptept" className="flex-1 flex flex-col">{children}</div>;
}
