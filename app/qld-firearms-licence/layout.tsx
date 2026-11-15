import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufirearmsqld");

export default function QldFirearmsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufirearmsqld" className="flex-1 flex flex-col">{children}</div>;
}
