import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("casfa");

export default function CasfaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="casfa" className="flex-1 flex flex-col">{children}</div>;
}
