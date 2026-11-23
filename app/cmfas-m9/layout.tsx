import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgm9");

export default function CmfasM9Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgm9" className="flex-1 flex flex-col">{children}</div>;
}
