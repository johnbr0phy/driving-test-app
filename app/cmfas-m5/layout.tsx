import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgm5");

export default function CmfasM5Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgm5" className="flex-1 flex flex-col">{children}</div>;
}
