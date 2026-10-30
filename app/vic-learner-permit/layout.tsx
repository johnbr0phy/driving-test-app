import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auvic");

export default function AuvicLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auvic" className="flex-1 flex flex-col">{children}</div>;
}
