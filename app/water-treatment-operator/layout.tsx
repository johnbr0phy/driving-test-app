import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("waterop");

export default function WaterOpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="waterop" className="flex-1 flex flex-col">{children}</div>;
}
