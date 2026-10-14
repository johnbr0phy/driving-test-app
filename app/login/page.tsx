"use client";

import { AccessibleOverlay } from "@/components/AccessibleOverlay";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { examNameForPath } from "@/hooks/useThemePath";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="bg-white dark:bg-gray-900 relative min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { login, loginWithGoogle, resetPassword, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestoreLoaded = useStore((state) => state.firestoreLoaded);
  const { t } = useTranslation();
  const isNative = useIsNativeApp();

  const redirectTo = searchParams.get("redirect");
  // Exam pages are English-only, so their copy is not in i18n
  const redirectExamName = examNameForPath(redirectTo);

  // Route signed-in users onward. This is what completes the mobile
  // signInWithRedirect flow: the page reloads after the Google round trip
  // with no click handler in flight, so navigation has to happen here.
  // Don't decide between dashboard and onboarding until Firestore has
  // loaded — routing on a not-yet-loaded store briefly flashes the state
  // selector for users who already have a state.
  useEffect(() => {
    if (authLoading || !user) return;
    if (redirectTo) {
      router.push(redirectTo);
      return;
    }
    if (!firestoreLoaded) return;
    const hasState = useStore.getState().selectedState;
    router.push(hasState ? "/dashboard" : "/onboarding/select-state");
  }, [authLoading, user, redirectTo, firestoreLoaded, router]);

  // If sign-in ends without a user (e.g. cancelling the guest-conflict
  // dialog signs the user back out), release the button loading state —
  // the submit handlers intentionally leave it on while awaiting redirect.
  useEffect(() => {
    if (!authLoading && !user) setLoading(false);
  }, [authLoading, user]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(t("login.passwordResetSent"));
      setShowResetPassword(false);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError(t("login.noAccountFound"));
      } else {
        setError(err.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await login(email, password);
      // Navigation happens in the effect above once Firestore data has
      // loaded; keep the button in its loading state until then.
    } catch (err: any) {
      setError(err.message || "Failed to log in");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      // Navigation happens in the effect above once Firestore data has
      // loaded; keep the button in its loading state until then.
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 relative flex flex-1 items-center justify-center py-12 px-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
      <Card className="relative w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("login.welcomeBack")}</CardTitle>
          <CardDescription className="text-center">
            {redirectExamName ? `Log in to continue the ${redirectExamName}` : t("login.logInToContinue")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div id="auth-error" role="alert" className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div role="status" className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Google Sign-In — hidden in the native app: Google blocks
                OAuth inside embedded WebViews, and offering it on iOS
                would require adding Sign in with Apple (guideline 4.8) */}
            {!isNative && (
              <>
                <WebViewGoogleWarning
                  onGoogleSignIn={handleGoogleSignIn}
                  disabled={loading}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">{t("common.orContinueWithEmail")}</span>
                  </div>
                </div>
              </>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                aria-describedby={error ? "auth-error" : undefined}
                autoComplete="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">{t("common.password")}</Label>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm text-brand hover:underline"
                >
                  {t("common.forgotPassword")}
                </button>
              </div>
              <Input
                id="password"
                aria-describedby={error ? "auth-error" : undefined}
                autoComplete="current-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" disabled={loading}>
              {loading ? t("login.loggingIn") : t("login.logIn")}
            </Button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                {t("common.noAccount")}{" "}
                <Link href={redirectTo ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : "/signup"} className="text-brand hover:underline font-semibold">
                  {t("common.signUp")}
                </Link>
              </div>
            </form>

            {/* Password Reset Modal */}
            {showResetPassword && (
              <AccessibleOverlay onClose={() => setShowResetPassword(false)} aria-label={t("login.resetPassword")} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-2">{t("login.resetPassword")}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t("login.resetPasswordDesc")}
                  </p>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    {error && <p id="reset-error" role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
                    <Input
                      aria-label={t("common.email")}
                      aria-describedby={error ? "reset-error" : undefined}
                      autoComplete="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setShowResetPassword(false)}
                        disabled={loading}
                        className="w-full bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700"
                      >
                        {t("common.cancel")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        {loading ? t("login.sending") : t("login.sendResetLink")}
                      </Button>
                    </div>
                  </form>
                </div>
              </AccessibleOverlay>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
