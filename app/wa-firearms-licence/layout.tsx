import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufirearmswa");

export default function WaFirearmsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufirearmswa" className="flex-1 flex flex-col">{children}</div>;
}
