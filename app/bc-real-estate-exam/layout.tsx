import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("bcrealestate");

export default function BcRealEstateLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="bcrealestate" className="flex-1 flex flex-col">{children}</div>;
}
