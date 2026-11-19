import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("r410a");

export default function R410aLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="r410a" className="flex-1 flex flex-col">{children}</div>;
}
