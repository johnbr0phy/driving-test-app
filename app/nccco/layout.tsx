import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nccco");

export default function NcccoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nccco" className="flex-1 flex flex-col">{children}</div>;
}
