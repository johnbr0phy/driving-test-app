import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cabc");

export default function CabcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cabc" className="flex-1 flex flex-col">{children}</div>;
}
