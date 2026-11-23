import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgm9a");

export default function CmfasM9aLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgm9a" className="flex-1 flex flex-col">{children}</div>;
}
