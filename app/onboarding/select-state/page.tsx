"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StateSelector } from "@/components/StateSelector";
import { useStore } from "@/store/useStore";

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

  const welcomeName = user?.displayName || user?.email || "there";

  return (
    <div className="bg-white flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome{isGuest ? "" : `, ${welcomeName}`}!
          </CardTitle>
          <CardDescription className="text-center">
            Which state are you preparing for?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <StateSelector
            onSelect={setSelectedState}
            selectedState={selectedState}
          />

          <Button
            onClick={handleComplete}
            disabled={!selectedState || loading}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
