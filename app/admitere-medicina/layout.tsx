import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("roadmed");

export default function RoadmedLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="roadmed" className="flex-1 flex flex-col">{children}</div>;
}
