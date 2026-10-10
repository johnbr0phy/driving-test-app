import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("civics");

export default function CitizenshipLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="civics" className="flex-1 flex flex-col">{children}</div>;
}
