import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ascppbt");

export default function AscpPbtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ascppbt" className="flex-1 flex flex-col">{children}</div>;
}
