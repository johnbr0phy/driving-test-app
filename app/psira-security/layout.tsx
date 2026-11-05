import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zapsira");

export default function ZaPsiraLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zapsira" className="flex-1 flex flex-col">{children}</div>;
}
