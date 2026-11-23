import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufasa");

export default function SaFirearmsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufasa" className="flex-1 flex flex-col">{children}</div>;
}
