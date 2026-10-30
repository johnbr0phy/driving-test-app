import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("uk18ed");

export default function Uk18edLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="uk18ed" className="flex-1 flex flex-col">{children}</div>;
}
