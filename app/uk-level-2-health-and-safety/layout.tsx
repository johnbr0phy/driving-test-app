import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukhs2");

export default function UkHs2Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukhs2" className="flex-1 flex flex-col">{children}</div>;
}
