import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aesira");

export default function AeSiraLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aesira" className="flex-1 flex flex-col">{children}</div>;
}
