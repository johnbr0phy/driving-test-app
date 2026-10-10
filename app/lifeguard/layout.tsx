import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("lifeguard");

export default function LifeguardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="lifeguard" className="flex-1 flex flex-col">{children}</div>;
}
