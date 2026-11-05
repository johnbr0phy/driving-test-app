import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phrebroker");

export default function PhrebrokerLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phrebroker" className="flex-1 flex flex-col">{children}</div>;
}
