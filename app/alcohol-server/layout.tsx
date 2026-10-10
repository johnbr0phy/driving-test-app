import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("alcohol");

export default function AlcoholLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="alcohol" className="flex-1 flex flex-col">{children}</div>;
}
