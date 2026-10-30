import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nasm");

export default function NasmLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nasm" className="flex-1 flex flex-col">{children}</div>;
}
