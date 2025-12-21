"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Loader2, User, AlertTriangle, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();
  const photoURL = useStore((state) => state.photoURL);
  const setPhotoURL = useStore((state) => state.setPhotoURL);
  const resetAllData = useStore((state) => state.resetAllData);
  const selectedState = useStore((state) => state.selectedState);
  const setSelectedState = useStore((state) => state.setSelectedState);
  const getCurrentTest = useStore((state) => state.getCurrentTest);

  const [loadingGooglePhoto, setLoadingGooglePhoto] = useState(false);
  const [stateChangeDialog, setStateChangeDialog] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [pendingStateCode, setPendingStateCode] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && !user) {
      router.push("/login");
    }
  }, [hydrated, user, router]);

  const handleUseGooglePhoto = async () => {
    if (!user) return;

    // Check if user has a Google photo URL
    const googlePhotoURL = user.photoURL;
    if (!googlePhotoURL) {
      alert("No Google profile photo found. Please sign in with Google to use your Google photo.");
      return;
    }

    setLoadingGooglePhoto(true);
    try {
      // Use the Google photo URL directly
      setPhotoURL(googlePhotoURL);
      alert("Google photo set successfully!");
    } catch (error) {
      console.error("Error using Google photo:", error);
      alert("Failed to use Google photo. Please try again.");
    } finally {
      setLoadingGooglePhoto(false);
    }
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  const handleResetData = () => {
    setResetDialog(true);
  };

  const confirmReset = () => {
    resetAllData();
    setResetDialog(false);
    router.push("/dashboard");
  };

  const handleStateChange = (newStateCode: string) => {
    if (newStateCode === selectedState) return;
    setPendingStateCode(newStateCode);
    setStateChangeDialog(true);
  };

  const confirmStateChange = () => {
    if (!pendingStateCode) return;
    setSelectedState(pendingStateCode);
    setStateChangeDialog(false);
    setPendingStateCode(null);
    router.push("/dashboard");
  };

  const currentStateName = states.find(s => s.code === selectedState)?.name || selectedState;
  const pendingStateName = states.find(s => s.code === pendingStateCode)?.name || pendingStateCode;

  if (!hydrated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>

        {/* State Selection Card */}
        <Card className="max-w-2xl mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              State Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Currently practicing for:</div>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {currentStateName}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Change State
                </label>
                <select
                  value={selectedState || ""}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name} ({state.code})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  <strong className="text-orange-600">Warning:</strong> Switching states will permanently delete your current state&apos;s progress.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Photo Card */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6">
              {/* Current Photo */}
              <Avatar className="h-32 w-32">
                <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                <AvatarFallback className="text-6xl">😊</AvatarFallback>
              </Avatar>

              {/* User Email */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Account</div>
                <div className="font-medium">{user.email}</div>
              </div>

              {/* Google Photo Option */}
              {user.photoURL && (
                <div className="w-full">
                  <Button
                    onClick={handleUseGooglePhoto}
                    disabled={loadingGooglePhoto}
                    className="w-full"
                    variant="outline"
                  >
                    {loadingGooglePhoto ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Use Google Photo
                      </>
                    )}
                  </Button>
                </div>
              )}

              {!user.photoURL && (
                <div className="text-sm text-gray-500 text-center">
                  Sign in with Google to use your Google profile photo
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="max-w-2xl mt-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Reset All Data</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will permanently delete all your test progress, scores, attempts, and training data.
                  Your account and state selection will remain, but all progress will be reset to zero.
                </p>
                <Button
                  onClick={handleResetData}
                  variant="destructive"
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reset All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State Change Confirmation Dialog */}
      <Dialog open={stateChangeDialog} onOpenChange={setStateChangeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Switch State?
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 text-base">
                You&apos;re about to switch from {currentStateName} to {pendingStateName}.
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-600">Important:</strong> Your progress for {currentStateName} will <strong>NOT be saved</strong> and will be <strong>permanently lost</strong>. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                <li>All test scores and attempts</li>
                <li>In-progress tests</li>
                <li>Training mode statistics</li>
              </ul>
              <p className="text-gray-700">
                You&apos;ll start fresh with {pendingStateName} and <strong>cannot recover</strong> your {currentStateName} progress.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setStateChangeDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmStateChange}>
              Yes, Switch State
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Data Confirmation Dialog */}
      <Dialog open={resetDialog} onOpenChange={setResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Reset All Data?
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 text-base">
                This will permanently delete ALL your data across ALL states.
              </p>
              <p className="text-gray-700">
                You will lose:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                <li>All test progress and scores</li>
                <li>All training mode statistics</li>
                <li>All attempt history</li>
                <li>Data for every state you&apos;ve practiced</li>
              </ul>
              <p className="text-red-600 font-semibold">
                This action cannot be undone.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReset}>
              Yes, Reset Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
