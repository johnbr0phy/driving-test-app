import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hunter");

export default function HunterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hunter" className="flex-1 flex flex-col">{children}</div>;
}
