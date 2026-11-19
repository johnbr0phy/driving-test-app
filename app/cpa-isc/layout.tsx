import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpaisc");

export default function CpaIscLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpaisc" className="flex-1 flex flex-col">{children}</div>;
}
