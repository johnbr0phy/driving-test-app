import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aswb");

export default function AswbLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aswb" className="flex-1 flex flex-col">{children}</div>;
}
