import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("kentsa");

export default function KentsaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="kentsa" className="flex-1 flex flex-col">{children}</div>;
}
