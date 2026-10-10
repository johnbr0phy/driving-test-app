import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("realestate");

export default function RealestateLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="realestate" className="flex-1 flex flex-col">{children}</div>;
}
