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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 pb-24 md:pb-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome{isGuest ? "" : `, ${welcomeName}`}!
            </CardTitle>
            <CardDescription className="text-center">
              Which state are you preparing for?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StateSelector
              onSelect={setSelectedState}
              selectedState={selectedState}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sticky bottom button on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden">
        <Button
          onClick={handleComplete}
          disabled={!selectedState || loading}
          className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg"
        >
          {loading ? "Saving..." : "Continue to Dashboard"}
        </Button>
      </div>

      {/* Regular button on desktop (hidden on mobile) */}
      <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
        <Button
          onClick={handleComplete}
          disabled={!selectedState || loading}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          {loading ? "Saving..." : "Continue to Dashboard"}
        </Button>
      </div>
    </div>
  );
}
