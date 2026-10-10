import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ham");

export default function HamLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ham" className="flex-1 flex flex-col">{children}</div>;
}
