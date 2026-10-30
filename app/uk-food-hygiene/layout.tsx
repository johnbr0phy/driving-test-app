import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukfood");

export default function UkfoodLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukfood" className="flex-1 flex flex-col">{children}</div>;
}
