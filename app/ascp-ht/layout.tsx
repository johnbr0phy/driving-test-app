import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ascpht");

export default function AscpHtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ascpht" className="flex-1 flex flex-col">{children}</div>;
}
