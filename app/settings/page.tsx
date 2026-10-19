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
import { V2Sync } from "@/components/v2/V2Sync";
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
  const examStates = useStore((state) => state.examStates);

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

  // The Google photo already shows when no other photo is saved, so the
  // button is only for going back to it from a different one.
  const canUseGooglePhoto = !!user?.photoURL && !!photoURL && photoURL !== user.photoURL;
  const handleUseGooglePhoto = () => {
    if (user?.photoURL) setPhotoURL(user.photoURL);
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
    router.push(selectedState ? "/dmv/dashboard" : "/tests");
  };

  const hasStarted = useStartedTests();
  const resetV2Exam = useV2Store((s) => s.resetExam);

  // Started tests only: the All tests menu already lists every test.
  const startedTests = TEST_CATALOG.filter((test) => hasStarted(test.id));
  const hasDmv = startedTests.some((test) => test.id === "dmv");
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

  const openStateDialog = () => {
    setPendingStateCode(selectedState);
    setStateChangeDialog(true);
  };
  const stateChanged = !!pendingStateCode && pendingStateCode !== selectedState;

  const confirmStateChange = () => {
    if (!stateChanged || !pendingStateCode) return;
    setSelectedState(pendingStateCode);
    setStateChangeDialog(false);
    setPendingStateCode(null);
    router.push("/dmv/dashboard");
  };

  const stateName = (code: string) => states.find((s) => s.code === code)?.name || code;

  if (!hydrated || !user) {
    return null;
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      {/* v2 progress (SAT, ACT...) otherwise loads only on v2 pages, so this
          device's list would miss tests started on another one. */}
      <V2Sync />
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">{t("settings.settings")}</h1>

        {/* Account: who is signed in, their photo, log out */}
        <Card className="bg-gray-50 dark:bg-gray-950 mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarImage src={displayPhotoURL || undefined} alt="" />
                  <AvatarFallback className="text-3xl">😊</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t("settings.signedInAs")}</div>
                  <div className="font-medium text-gray-900 dark:text-gray-50 truncate">{user.email}</div>
                  {canUseGooglePhoto ? (
                    <button
                      type="button"
                      onClick={handleUseGooglePhoto}
                      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand-dark hover:underline"
                    >
                      <User className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("settings.useGooglePhoto")}
                    </button>
                  ) : !user.photoURL && (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t("settings.signInWithGoogle")}</div>
                  )}
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="sm:w-auto w-full text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("common.logOut")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* The tests this account has started, each with its own delete. The
            DMV state is part of the DMV row: it only ever applied to the DMV. */}
        <Card className="bg-gray-50 dark:bg-gray-950 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              {t("settings.yourTests")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {startedTests.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              {startedTests.map((test) => {
                const stateCode = test.id === "dmv" ? selectedState : examStates[test.id];
                const status = stateCode ? stateName(stateCode) : t("settings.inProgress");
                return (
                  <li key={test.id} data-theme={test.theme} className="flex items-center">
                    <Link href={test.dashboardHref} className="flex flex-1 min-w-0 items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${hasTigerSet(test.id) ? "" : "bg-brand text-white"}`}>
                        <TestIcon examId={test.id} icon={test.icon} className={hasTigerSet(test.id) ? "h-9 w-9" : "h-5 w-5"} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-medium text-gray-900 dark:text-gray-50">{test.name}</span>
                        <span className="flex items-center gap-1 text-sm text-brand-dark font-medium">
                          {stateCode && <MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
                          {status}
                        </span>
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </Link>
                    {/* Same-width slot on every row keeps the chevrons in a column */}
                    {hasDmv && (
                      <span className="flex w-20 flex-shrink-0 justify-end">
                        {test.id === "dmv" && (
                          <button
                            type="button"
                            onClick={openStateDialog}
                            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-brand-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label={t("settings.changeDmvState")}
                          >
                            {t("settings.change")}
                          </button>
                        )}
                      </span>
                    )}
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
            ) : (
              <Button asChild className="bg-brand hover:bg-brand-hover text-white">
                <Link href="/tests">{t("footer.allTests")}</Link>
              </Button>
            )}
          </CardContent>
        </Card>

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

      {/* DMV state change: the picker and the warning in one step */}
      <Dialog open={stateChangeDialog} onOpenChange={setStateChangeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t("settings.changeDmvState")}
            </DialogTitle>
            <DialogDescription className="pt-1 text-left">{t("settings.stateDialogBody")}</DialogDescription>
          </DialogHeader>
          <select
            aria-label={t("settings.changeDmvState")}
            value={pendingStateCode ?? ""}
            onChange={(e) => setPendingStateCode(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {stateChanged && (
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-3 text-sm text-red-700 dark:text-red-300">
              <p className="font-semibold">{t("settings.switchStateWarning")}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>{t("settings.allTestScores")}</li>
                <li>{t("settings.inProgressTests")}</li>
                <li>{t("settings.trainingModeStats")}</li>
              </ul>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700" onClick={() => setStateChangeDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmStateChange} disabled={!stateChanged}>
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
