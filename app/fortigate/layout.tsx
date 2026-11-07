import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("fortigate");

export default function FortigateLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="fortigate" className="flex-1 flex flex-col">{children}</div>;
}
