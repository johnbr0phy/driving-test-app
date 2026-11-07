import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("deheilpr");

export default function DeheilprLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="deheilpr" className="flex-1 flex flex-col">{children}</div>;
}
