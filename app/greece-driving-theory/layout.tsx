import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("grdriving");

export default function GrdrivingLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="grdriving" className="flex-1 flex flex-col">{children}</div>;
}
