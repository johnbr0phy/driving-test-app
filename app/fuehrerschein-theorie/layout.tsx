import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("detheorie");

export default function DetheorieLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="detheorie" className="flex-1 flex flex-col">{children}</div>;
}
