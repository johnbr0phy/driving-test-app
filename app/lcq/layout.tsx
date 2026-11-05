import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzlcq");

export default function NzlcqLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzlcq" className="flex-1 flex flex-col">{children}</div>;
}
