import { Car, Truck, Bike, Flag, Plane, Radio, Thermometer, HeartPulse, Pill, Syringe, Stethoscope, Activity, SmilePlus, Siren, Utensils, House, Umbrella, Stamp, GraduationCap, Cloud, Cpu, ChefHat, Sailboat, Target, LockKeyhole, BookOpenCheck, Microscope, Scissors, ShieldCheck } from "lucide-react";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import Image from "next/image";
import { getTigerAsset, hasTigerSet } from "@/lib/tigerAssets";

export function TestIcon({ icon, examId, className = "h-5 w-5" }: { icon: TestCatalogEntry["icon"]; examId?: string; className?: string }) {
  if (examId && hasTigerSet(examId)) {
    return <Image src={getTigerAsset(examId)} alt="" width={48} height={48} className={`${className} object-contain`} />;
  }
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
  if (icon === "umbrella") return <Umbrella className={className} aria-hidden="true" />;
  if (icon === "stamp") return <Stamp className={className} aria-hidden="true" />;
  if (icon === "graduation") return <GraduationCap className={className} aria-hidden="true" />;
  if (icon === "cloud") return <Cloud className={className} aria-hidden="true" />;
  if (icon === "cpu") return <Cpu className={className} aria-hidden="true" />;
  if (icon === "chef") return <ChefHat className={className} aria-hidden="true" />;
  if (icon === "sailboat") return <Sailboat className={className} aria-hidden="true" />;
  if (icon === "target") return <Target className={className} aria-hidden="true" />;
  if (icon === "lock") return <LockKeyhole className={className} aria-hidden="true" />;
  if (icon === "book") return <BookOpenCheck className={className} aria-hidden="true" />;
  if (icon === "microscope") return <Microscope className={className} aria-hidden="true" />;
  if (icon === "scissors") return <Scissors className={className} aria-hidden="true" />;
  return <ShieldCheck className={className} aria-hidden="true" />;
}
