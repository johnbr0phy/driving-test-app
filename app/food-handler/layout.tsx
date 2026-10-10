import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("foodhandler");

export default function FoodhandlerLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="foodhandler" className="flex-1 flex flex-col">{children}</div>;
}
