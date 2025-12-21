"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Loader2, User, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();
  const photoURL = useStore((state) => state.photoURL);
  const setPhotoURL = useStore((state) => state.setPhotoURL);
  const resetAllData = useStore((state) => state.resetAllData);

  const [loadingGooglePhoto, setLoadingGooglePhoto] = useState(false);

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
    if (confirm("⚠️ WARNING: This will permanently delete all your test progress, scores, and training data. This action cannot be undone.\n\nAre you sure you want to reset all data?")) {
      resetAllData();
      alert("All data has been reset successfully!");
      router.push("/dashboard");
    }
  };

  if (!hydrated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}
