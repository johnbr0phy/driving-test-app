import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpareg");

export default function CpaRegLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpareg" className="flex-1 flex flex-col">{children}</div>;
}
