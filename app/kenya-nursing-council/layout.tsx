import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("kenck");

export default function KenckLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="kenck" className="flex-1 flex flex-col">{children}</div>;
}
