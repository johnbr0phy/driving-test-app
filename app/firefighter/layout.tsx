import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ffi");

export default function FfiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ffi" className="flex-1 flex flex-col">{children}</div>;
}
