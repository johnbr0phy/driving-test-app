"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, Loader2, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHydration } from "@/hooks/useHydration";

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();
  const photoURL = useStore((state) => state.photoURL);
  const setPhotoURL = useStore((state) => state.setPhotoURL);

  const [uploading, setUploading] = useState(false);
  const [loadingGooglePhoto, setLoadingGooglePhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && !user) {
      router.push("/login");
    }
  }, [hydrated, user, router]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update store
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUseGooglePhoto = async () => {
    if (!user) return;

    // Check if user has a Google photo URL
    const googlePhotoURL = user.photoURL;
    if (!googlePhotoURL) {
      alert("No Google profile photo found. Please sign in with Google or upload a custom photo.");
      return;
    }

    setLoadingGooglePhoto(true);
    try {
      // Use the Google photo URL directly
      setPhotoURL(googlePhotoURL);
    } catch (error) {
      console.error("Error using Google photo:", error);
      alert("Failed to use Google photo. Please try again.");
    } finally {
      setLoadingGooglePhoto(false);
    }
  };

  const displayPhotoURL = photoURL || user?.photoURL;
  const initials = user?.email?.substring(0, 2).toUpperCase() || "U";

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
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>

              {/* User Email */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Account</div>
                <div className="font-medium">{user.email}</div>
              </div>

              {/* Upload Options */}
              <div className="w-full space-y-3">
                {/* Upload Custom Photo */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
                    variant="outline"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Custom Photo
                      </>
                    )}
                  </Button>
                </div>

                {/* Use Google Photo */}
                {user.photoURL && (
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
                )}
              </div>

              <div className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, GIF (max 5MB)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
