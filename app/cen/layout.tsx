import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cen");

export default function CenLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cen" className="flex-1 flex flex-col">{children}</div>;
}
