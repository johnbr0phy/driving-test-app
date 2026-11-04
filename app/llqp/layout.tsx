import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("llqp");

export default function LlqpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="llqp" className="flex-1 flex flex-col">{children}</div>;
}
