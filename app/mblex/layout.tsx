import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mblex");

export default function MblexLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mblex" className="flex-1 flex flex-col">{children}</div>;
}
