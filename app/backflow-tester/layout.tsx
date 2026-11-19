import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("backflow");

export default function BackflowLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="backflow" className="flex-1 flex flex-col">{children}</div>;
}
