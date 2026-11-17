import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("caairbrake");

export default function OntarioAirBrakeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="caairbrake" className="flex-1 flex flex-col">{children}</div>;
}
