import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("de34a");

export default function De34aLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="de34a" className="flex-1 flex flex-col">{children}</div>;
}
