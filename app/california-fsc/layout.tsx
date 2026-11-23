import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cafsc");

export default function CaliforniaFscLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cafsc" className="flex-1 flex flex-col">{children}</div>;
}
