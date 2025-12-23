"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { states } from "@/data/states";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OnboardingSelectStatePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const storeSelectedState = useStore((state) => state.selectedState);
  const setStoreState = useStore((state) => state.setSelectedState);
  const isGuest = useStore((state) => state.isGuest);

  // Redirect if user already has a state selected
  useEffect(() => {
    if (storeSelectedState) {
      router.push("/dashboard");
    }
  }, [storeSelectedState, router]);

  const handleComplete = async () => {
    if (!selectedState) return;

    setLoading(true);

    // Save state to store (which will sync to Firestore)
    setStoreState(selectedState);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  // Redirect to home if not logged in and not a guest
  if (!user && !isGuest) {
    router.push("/");
    return null;
  }

  return (
    <div className="bg-white min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2 text-2xl md:text-3xl font-medium text-gray-800">
          <span>I need to pass the</span>
          <Select onValueChange={setSelectedState} value={selectedState || undefined}>
            <SelectTrigger className="w-auto inline-flex text-xl md:text-2xl font-semibold text-orange-600 border-none shadow-none focus:ring-0 focus:ring-offset-0 px-1 underline decoration-orange-300 decoration-2 underline-offset-4 hover:decoration-orange-500">
              <SelectValue placeholder="select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>driving test.</span>
        </div>

        <Button
          onClick={handleComplete}
          disabled={!selectedState || loading}
          className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
        >
          {loading ? "Loading..." : "Let's go"}
        </Button>
      </div>
    </div>
  );
}
