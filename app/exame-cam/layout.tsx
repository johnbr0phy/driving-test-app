import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ptcam");

export default function PtcamLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ptcam" className="flex-1 flex flex-col">{children}</div>;
}
