import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zafirearm");

export default function ZaFirearmLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zafirearm" className="flex-1 flex flex-col">{children}</div>;
}
