import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukfood3");

export default function UkFood3Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukfood3" className="flex-1 flex flex-col">{children}</div>;
}
