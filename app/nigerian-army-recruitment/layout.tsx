import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ngarmy");

export default function NgarmyLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ngarmy" className="flex-1 flex flex-col">{children}</div>;
}
