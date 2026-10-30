import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("barber");

export default function BarberLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="barber" className="flex-1 flex flex-col">{children}</div>;
}
