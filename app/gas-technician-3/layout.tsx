import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cagas3");

export default function GasTech3Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cagas3" className="flex-1 flex flex-col">{children}</div>;
}
