import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukbregs");

export default function UkbregsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukbregs" className="flex-1 flex flex-col">{children}</div>;
}
