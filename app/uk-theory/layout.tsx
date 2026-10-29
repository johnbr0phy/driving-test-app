import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukcar");

export default function UkcarLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukcar" className="flex-1 flex flex-col">{children}</div>;
}
