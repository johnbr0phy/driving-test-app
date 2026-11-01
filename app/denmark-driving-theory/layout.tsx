import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dkteori");

export default function DkteoriLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dkteori" className="flex-1 flex flex-col">{children}</div>;
}
