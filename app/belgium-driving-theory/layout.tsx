import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bedriving");

export default function BedrivingLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bedriving" className="flex-1 flex flex-col">{children}</div>;
}
