import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cehrs");

export default function CehrsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cehrs" className="flex-1 flex flex-col">{children}</div>;
}
