import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phcle");

export default function PhcleLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phcle" className="flex-1 flex flex-col">{children}</div>;
}
