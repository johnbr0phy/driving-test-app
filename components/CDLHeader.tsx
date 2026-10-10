"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTestTheme } from "@/contexts/TestThemeContext";
import { Truck, Bike, Flag, Plane, Radio, Thermometer, HeartPulse, Pill, Syringe, Stethoscope, Activity, SmilePlus, Siren, Utensils, House, Umbrella, Stamp, GraduationCap, Cloud, Cpu, ChefHat, Sailboat, Target, LockKeyhole, BookOpenCheck, Medal, Bandage, HardHat, Forklift, Wine, PencilLine, BadgeCheck, LifeBuoy, Building2, Microscope, Scissors, ShieldCheck } from "lucide-react";
import { getExamById } from "@/lib/exams";
import Image from "next/image";
import { TestSwitcher } from "@/components/TestSwitcher";

export function CDLHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const isGuest = useStore((state) => state.isGuest);
  const hydrated = useHydration();
  const theme = useTestTheme();

  const displayPhotoURL = photoURL || user?.photoURL;

  const hideHeader = pathname?.startsWith(`${theme.routeBase}/test`) || pathname === `${theme.routeBase}/training`;

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={theme.logoHome} className="flex items-center gap-2 group flex-shrink-0">
          {theme.logoIcon ? (
            <Image src={theme.logoIcon} alt={theme.name} width={40} height={40} className="w-10 h-10" />
          ) : (
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              {(() => {
                const icon = getExamById(theme.id)?.icon;
                if (icon === "bike") return <Bike className="h-6 w-6 text-white" />;
                if (icon === "flag") return <Flag className="h-6 w-6 text-white" />;
                if (icon === "plane") return <Plane className="h-6 w-6 text-white" />;
                if (icon === "radio") return <Radio className="h-6 w-6 text-white" />;
                if (icon === "thermometer") return <Thermometer className="h-6 w-6 text-white" />;
                if (icon === "heart") return <HeartPulse className="h-6 w-6 text-white" />;
                if (icon === "pill") return <Pill className="h-6 w-6 text-white" />;
                if (icon === "syringe") return <Syringe className="h-6 w-6 text-white" />;
                if (icon === "stethoscope") return <Stethoscope className="h-6 w-6 text-white" />;
                if (icon === "activity") return <Activity className="h-6 w-6 text-white" />;
                if (icon === "tooth") return <SmilePlus className="h-6 w-6 text-white" />;
                if (icon === "siren") return <Siren className="h-6 w-6 text-white" />;
                if (icon === "utensils") return <Utensils className="h-6 w-6 text-white" />;
                if (icon === "house") return <House className="h-6 w-6 text-white" />;
                if (icon === "umbrella") return <Umbrella className="h-6 w-6 text-white" />;
                if (icon === "stamp") return <Stamp className="h-6 w-6 text-white" />;
                if (icon === "graduation") return <GraduationCap className="h-6 w-6 text-white" />;
                if (icon === "cloud") return <Cloud className="h-6 w-6 text-white" />;
                if (icon === "cpu") return <Cpu className="h-6 w-6 text-white" />;
                if (icon === "chef") return <ChefHat className="h-6 w-6 text-white" />;
                if (icon === "sailboat") return <Sailboat className="h-6 w-6 text-white" />;
                if (icon === "target") return <Target className="h-6 w-6 text-white" />;
                if (icon === "lock") return <LockKeyhole className="h-6 w-6 text-white" />;
                if (icon === "book") return <BookOpenCheck className="h-6 w-6 text-white" />;
                if (icon === "medal") return <Medal className="h-6 w-6 text-white" />;
                if (icon === "bandage") return <Bandage className="h-6 w-6 text-white" />;
                if (icon === "hardhat") return <HardHat className="h-6 w-6 text-white" />;
                if (icon === "forklift") return <Forklift className="h-6 w-6 text-white" />;
                if (icon === "wine") return <Wine className="h-6 w-6 text-white" />;
                if (icon === "pencil") return <PencilLine className="h-6 w-6 text-white" />;
                if (icon === "badge") return <BadgeCheck className="h-6 w-6 text-white" />;
                if (icon === "lifebuoy") return <LifeBuoy className="h-6 w-6 text-white" />;
                if (icon === "building") return <Building2 className="h-6 w-6 text-white" />;
                if (icon === "microscope") return <Microscope className="h-6 w-6 text-white" />;
                if (icon === "scissors") return <Scissors className="h-6 w-6 text-white" />;
                if (icon === "shield") return <ShieldCheck className="h-6 w-6 text-white" />;
                return <Truck className="h-6 w-6 text-white" />;
              })()}
            </div>
          )}
          <span className="text-2xl font-bold text-gray-900 group-hover:opacity-80 transition-opacity hidden sm:inline">
            {theme.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <TestSwitcher />
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : isGuest ? (
            <Link href={theme.signupPath}>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold">
                Sign Up to Save
              </Button>
            </Link>
          ) : (
            <Link href={theme.loginPath}>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
