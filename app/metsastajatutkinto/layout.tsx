import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("fihunt");

export default function FihuntLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="fihunt" className="flex-1 flex flex-col">{children}</div>;
}
