import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("carsrefrig");

export default function CarsrefrigLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="carsrefrig" className="flex-1 flex flex-col">{children}</div>;
}
