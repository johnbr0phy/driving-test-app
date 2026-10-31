import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ngfrsc");

export default function NgfrscLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ngfrsc" className="flex-1 flex flex-col">{children}</div>;
}
