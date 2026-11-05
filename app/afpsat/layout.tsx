import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("afpsat");

export default function AfpsatLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="afpsat" className="flex-1 flex flex-col">{children}</div>;
}
