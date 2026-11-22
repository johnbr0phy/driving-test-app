import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("shrmcp");

export default function ShrmCpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="shrmcp" className="flex-1 flex flex-col">{children}</div>;
}
