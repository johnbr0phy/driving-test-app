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
import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();
  const { t } = useTranslation();
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
    <div className="flex-1 bg-white dark:bg-background relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:to-background pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.backToDashboard")}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">{t("settings.settings")}</h1>
        </div>

        {/* State Selection and Profile Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* State Selection Card */}
          <Card className="bg-gray-50 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("settings.stateSelection")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("settings.currentlyPracticingFor")}</div>
                  <div className="text-2xl font-bold text-brand mb-4">
                    {currentStateName}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    {t("settings.changeState")}
                  </label>
                  <select
                    value={selectedState || ""}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name} ({state.code})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <strong className="text-brand">Warning:</strong> {t("settings.switchStateWarning")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Photo Card */}
          <Card className="bg-gray-50 dark:bg-gray-900">
            <CardHeader>
              <CardTitle>{t("settings.profilePhoto")}</CardTitle>
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
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t("settings.account")}</div>
                  <div className="font-medium">{user.email}</div>
                </div>

                {/* Google Photo Option */}
                {user.photoURL && (
                  <div className="w-full">
                    <Button
                      onClick={handleUseGooglePhoto}
                      disabled={loadingGooglePhoto}
                      className="w-full bg-white dark:bg-gray-800 text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"
                    >
                      {loadingGooglePhoto ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t("common.loading")}
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4 mr-2" />
                          {t("settings.useGooglePhoto")}
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {!user.photoURL && (
                  <div className="text-sm text-gray-500 text-center">
                    {t("settings.signInWithGoogle")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="bg-gray-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.dangerZone")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t("settings.resetAllData")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t("settings.resetAllDataDesc")}
                </p>
                <Button
                  onClick={handleResetData}
                  variant="destructive"
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {t("settings.resetAllData")}
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
            <DialogTitle className="flex items-center gap-2 text-brand">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.switchState")}
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                {t("settings.switchStateConfirm")} {currentStateName} {t("settings.to")} {pendingStateName}.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-brand">{t("settings.switchStateWarningDetail")}</strong> {currentStateName} {t("settings.willNotBeSaved")} {t("settings.willBePermanentlyLost")}. {t("settings.thisIncludes")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                <li>{t("settings.allTestScores")}</li>
                <li>{t("settings.inProgressTests")}</li>
                <li>{t("settings.trainingModeStats")}</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                {t("settings.startFreshWith")} {pendingStateName} {t("settings.cannotRecover")} {currentStateName} {t("settings.progressSuffix")}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600" onClick={() => setStateChangeDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmStateChange}>
              {t("settings.yesSwitchState")}
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
              {t("settings.resetAllDataConfirm")}
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                {t("settings.permanentlyDeleteAll")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {t("settings.youWillLose")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                <li>{t("settings.allTestProgress")}</li>
                <li>{t("settings.allTrainingStats")}</li>
                <li>{t("settings.allAttemptHistory")}</li>
                <li>{t("settings.dataForEveryState")}</li>
              </ul>
              <p className="text-red-600 font-semibold">
                {t("settings.cannotBeUndone")}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600" onClick={() => setResetDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmReset}>
              {t("settings.yesResetEverything")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
