import { Car, Truck, Bike, Flag, Plane, Radio, Thermometer, HeartPulse, Pill, Syringe, Stethoscope, Activity, SmilePlus, Siren, Utensils, House, Microscope, Scissors, ShieldCheck } from "lucide-react";
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
  if (icon === "pill") return <Pill className={className} aria-hidden="true" />;
  if (icon === "syringe") return <Syringe className={className} aria-hidden="true" />;
  if (icon === "stethoscope") return <Stethoscope className={className} aria-hidden="true" />;
  if (icon === "activity") return <Activity className={className} aria-hidden="true" />;
  if (icon === "tooth") return <SmilePlus className={className} aria-hidden="true" />;
  if (icon === "siren") return <Siren className={className} aria-hidden="true" />;
  if (icon === "utensils") return <Utensils className={className} aria-hidden="true" />;
  if (icon === "house") return <House className={className} aria-hidden="true" />;
  if (icon === "microscope") return <Microscope className={className} aria-hidden="true" />;
  if (icon === "scissors") return <Scissors className={className} aria-hidden="true" />;
  return <ShieldCheck className={className} aria-hidden="true" />;
}
