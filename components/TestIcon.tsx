import { Car, Truck, Bike, Flag, Plane, Radio, Thermometer, HeartPulse, Microscope, Scissors, ShieldCheck } from "lucide-react";
import type { TestCatalogEntry } from "@/lib/testCatalog";

export function TestIcon({ icon, className = "h-5 w-5" }: { icon: TestCatalogEntry["icon"]; className?: string }) {
  if (icon === "car") return <Car className={className} aria-hidden="true" />;
  if (icon === "truck") return <Truck className={className} aria-hidden="true" />;
  if (icon === "bike") return <Bike className={className} aria-hidden="true" />;
  if (icon === "flag") return <Flag className={className} aria-hidden="true" />;
  if (icon === "plane") return <Plane className={className} aria-hidden="true" />;
  if (icon === "radio") return <Radio className={className} aria-hidden="true" />;
  if (icon === "thermometer") return <Thermometer className={className} aria-hidden="true" />;
  if (icon === "heart") return <HeartPulse className={className} aria-hidden="true" />;
  if (icon === "microscope") return <Microscope className={className} aria-hidden="true" />;
  if (icon === "scissors") return <Scissors className={className} aria-hidden="true" />;
  return <ShieldCheck className={className} aria-hidden="true" />;
}
