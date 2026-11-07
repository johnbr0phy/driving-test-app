import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("semoto");

export default function SemotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="semoto" className="flex-1 flex flex-col">{children}</div>;
}
