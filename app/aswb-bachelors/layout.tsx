import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aswbbach");

export default function AswbBachLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aswbbach" className="flex-1 flex flex-col">{children}</div>;
}
