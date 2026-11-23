import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("servingitright");

export default function ServingItRightLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="servingitright" className="flex-1 flex flex-col">{children}</div>;
}
