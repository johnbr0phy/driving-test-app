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
import Link from "next/link";
import { Loader2, User, AlertTriangle, MapPin, LayoutGrid, ChevronRight, LogOut, Trash2, SunMoon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { useStartedTests } from "@/hooks/useStartedTests";
import { useV2Store } from "@/store/useV2Store";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { deleteV2Exam } from "@/lib/v2/sync";
import { TestIcon } from "@/components/TestIcon";
import { hasTigerSet } from "@/lib/tigerAssets";
import { ThemeSegmentedControl } from "@/components/ThemeToggle";

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const photoURL = useStore((state) => state.photoURL);
  const setPhotoURL = useStore((state) => state.setPhotoURL);
  const resetAllData = useStore((state) => state.resetAllData);
  const resetExamData = useStore((state) => state.resetExamData);
  const selectedState = useStore((state) => state.selectedState);
  const setSelectedState = useStore((state) => state.setSelectedState);

  const [loadingGooglePhoto, setLoadingGooglePhoto] = useState(false);
  const [stateChangeDialog, setStateChangeDialog] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [deleteTestId, setDeleteTestId] = useState<string | null>(null);
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

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleResetData = () => {
    setResetDialog(true);
  };

  const confirmReset = () => {
    resetAllData();
    setResetDialog(false);
    // Exam-only users have no DMV state; /dashboard would bounce them into
    // the state picker, so send them to the test hub instead.
    router.push(selectedState ? "/dashboard" : "/tests");
  };

  const hasStarted = useStartedTests();
  const resetV2Exam = useV2Store((s) => s.resetExam);

  // Started tests only: the All tests menu already lists every test.
  const startedTests = TEST_CATALOG.filter((test) => hasStarted(test.id));
  const deleteTest = TEST_CATALOG.find((test) => test.id === deleteTestId);

  const [deletingTest, setDeletingTest] = useState(false);
  const confirmDeleteTest = async () => {
    if (!deleteTestId) return;
    if (EXAMS_V2.some((e) => e.id === deleteTestId)) {
      // v2 progress syncs by merging, so delete it on the account too or the
      // next v2 page would merge it straight back.
      setDeletingTest(true);
      try {
        if (user) await deleteV2Exam(user.uid, deleteTestId);
        else resetV2Exam(deleteTestId);
      } catch (e) {
        // Keep the dialog open so a retry is one tap away.
        console.error("Deleting test progress failed:", e);
        setDeletingTest(false);
        return;
      }
      setDeletingTest(false);
    } else {
      resetExamData(deleteTestId);
    }
    setDeleteTestId(null);
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
    <div className="flex-1 bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* The tests this account has started, each with its own delete */}
        {startedTests.length > 0 && (
        <Card className="bg-gray-50 dark:bg-gray-950 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              {t("settings.yourTests")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              {startedTests.map((test) => {
                const status = test.id === "dmv" && selectedState ? currentStateName : t("settings.inProgress");
                return (
                  <li key={test.id} data-theme={test.theme} className="flex items-center">
                    <Link href={test.dashboardHref} className="flex flex-1 min-w-0 items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${hasTigerSet(test.id) ? "" : "bg-brand text-white"}`}>
                        <TestIcon examId={test.id} icon={test.icon} className={hasTigerSet(test.id) ? "h-9 w-9" : "h-5 w-5"} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-medium text-gray-900 dark:text-gray-50">{test.name}</span>
                        <span className="block text-sm text-brand-dark font-medium">{status}</span>
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTestId(test.id)}
                      className="mr-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title={t("settings.deleteTestProgress")}
                      aria-label={`${t("settings.deleteTestProgress")}: ${test.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        )}

        {/* State Selection and Profile Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* State Selection Card */}
          <Card className="bg-gray-50 dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("settings.stateSelection")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedState ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{t("settings.currentlyPracticingFor")}</div>
                    <div className="text-2xl font-bold text-brand-dark mb-4">
                      {currentStateName}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="settings-state" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">
                      {t("settings.changeState")}
                    </label>
                    <select id="settings-state"
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {states.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name} ({state.code})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <strong className="text-brand-dark">Warning:</strong> {t("settings.switchStateWarning")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("settings.noStateSelected")}</p>
                  <Button asChild className="w-full bg-brand hover:bg-brand-hover text-white">
                    <Link href="/onboarding/select-state">
                      {t("settings.chooseState")}
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Photo Card */}
          <Card className="bg-gray-50 dark:bg-gray-950">
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
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t("settings.account")}</div>
                  <div className="font-medium">{user.email}</div>
                </div>

                {/* Google Photo Option */}
                {user.photoURL && (
                  <div className="w-full">
                    <Button
                      onClick={handleUseGooglePhoto}
                      disabled={loadingGooglePhoto}
                      className="w-full bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700"
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
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {t("settings.signInWithGoogle")}
                  </div>
                )}

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("common.logOut")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appearance */}
        <Card className="bg-gray-50 dark:bg-gray-950 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SunMoon className="h-5 w-5" />
              {t("theme.appearance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSegmentedControl />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gray-50 dark:bg-gray-950 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.dangerZone")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t("settings.resetAllData")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
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
      </div>

      {/* State Change Confirmation Dialog */}
      <Dialog open={stateChangeDialog} onOpenChange={setStateChangeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-brand-dark">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.switchState")}
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-50 text-base">
                {t("settings.switchStateConfirm")} {currentStateName} {t("settings.to")} {pendingStateName}.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <strong className="text-brand-dark">{t("settings.switchStateWarningDetail")}</strong> {currentStateName} {t("settings.willNotBeSaved")} {t("settings.willBePermanentlyLost")}. {t("settings.thisIncludes")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 ml-2">
                <li>{t("settings.allTestScores")}</li>
                <li>{t("settings.inProgressTests")}</li>
                <li>{t("settings.trainingModeStats")}</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-200">
                {t("settings.startFreshWith")} {pendingStateName} {t("settings.cannotRecover")} {currentStateName} {t("settings.progressSuffix")}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700" onClick={() => setStateChangeDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmStateChange}>
              {t("settings.yesSwitchState")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete One Test's Progress Dialog */}
      <Dialog open={!!deleteTestId} onOpenChange={(open) => !open && setDeleteTestId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.deleteTestConfirm")}
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="text-gray-700 dark:text-gray-200">
                {t("settings.deleteTestBody")} <strong className="text-gray-900 dark:text-gray-50">{deleteTest?.name}</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-200">{t("settings.deleteTestOthersSafe")}</p>
              <p className="text-red-600 dark:text-red-400 font-semibold">{t("settings.cannotBeUndone")}</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700" onClick={() => setDeleteTestId(null)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTest} disabled={deletingTest}>
              {deletingTest && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {t("settings.deleteTestYes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Data Confirmation Dialog */}
      <Dialog open={resetDialog} onOpenChange={setResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              {t("settings.resetAllDataConfirm")}
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-50 text-base">
                {t("settings.permanentlyDeleteAll")}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                {t("settings.youWillLose")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 ml-2">
                <li>{t("settings.allTestProgress")}</li>
                <li>{t("settings.allTrainingStats")}</li>
                <li>{t("settings.allAttemptHistory")}</li>
                <li>{t("settings.dataForEveryState")}</li>
              </ul>
              <p className="text-red-600 dark:text-red-400 font-semibold">
                {t("settings.cannotBeUndone")}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700" onClick={() => setResetDialog(false)}>
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
