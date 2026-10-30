import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cask");

export default function CaskLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cask" className="flex-1 flex flex-col">{children}</div>;
}
