import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("moto");

export default function MotorcycleLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="moto" className="flex-1 flex flex-col">{children}</div>;
}
