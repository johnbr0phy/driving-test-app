import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukfaw");

export default function UkfawLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukfaw" className="flex-1 flex flex-col">{children}</div>;
}
