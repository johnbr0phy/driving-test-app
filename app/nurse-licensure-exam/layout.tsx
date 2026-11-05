import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phnle");

export default function PhnleLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phnle" className="flex-1 flex flex-col">{children}</div>;
}
