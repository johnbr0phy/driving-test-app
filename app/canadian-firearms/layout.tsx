import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("capal");

export default function CapalLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="capal" className="flex-1 flex flex-col">{children}</div>;
}
