import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cna");

export default function CnaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cna" className="flex-1 flex flex-col">{children}</div>;
}
