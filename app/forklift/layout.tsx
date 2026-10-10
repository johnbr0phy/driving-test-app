import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("forklift");

export default function ForkliftLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="forklift" className="flex-1 flex flex-col">{children}</div>;
}
