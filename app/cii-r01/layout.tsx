import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukr01");

export default function CiiR01Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukr01" className="flex-1 flex flex-col">{children}</div>;
}
