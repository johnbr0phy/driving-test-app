import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("fpc");

export default function FpcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="fpc" className="flex-1 flex flex-col">{children}</div>;
}
