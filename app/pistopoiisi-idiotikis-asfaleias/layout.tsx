import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("grsecurity");

export default function GrsecurityLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="grsecurity" className="flex-1 flex flex-col">{children}</div>;
}
