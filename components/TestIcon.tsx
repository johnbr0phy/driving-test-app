import { Car, Truck, Microscope, Scissors, ShieldCheck } from "lucide-react";
import type { TestCatalogEntry } from "@/lib/testCatalog";

export function TestIcon({ icon, className = "h-5 w-5" }: { icon: TestCatalogEntry["icon"]; className?: string }) {
  if (icon === "car") return <Car className={className} aria-hidden="true" />;
  if (icon === "truck") return <Truck className={className} aria-hidden="true" />;
  if (icon === "microscope") return <Microscope className={className} aria-hidden="true" />;
  if (icon === "scissors") return <Scissors className={className} aria-hidden="true" />;
  return <ShieldCheck className={className} aria-hidden="true" />;
}
