import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("schoolbus");

export default function SchoolBusLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="schoolbus" className="flex-1 flex flex-col">{children}</div>;
}
