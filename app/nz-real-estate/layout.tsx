import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzrealestate");

export default function NzrealestateLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzrealestate" className="flex-1 flex flex-col">{children}</div>;
}
