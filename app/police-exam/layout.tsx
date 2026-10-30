import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("police");

export default function PoliceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="police" className="flex-1 flex flex-col">{children}</div>;
}
