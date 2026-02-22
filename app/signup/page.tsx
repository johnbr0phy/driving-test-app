"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/data/states";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";

function SignupPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailConsent, setEmailConsent] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const setStoreState = useStore((state) => state.setSelectedState);
  const storeSelectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const setStoreEmailConsent = useStore((state) => state.setEmailConsent);

  // Check for state query param (e.g. /signup?state=OH)
  const stateParam = searchParams.get("state");
  const preselectedState = stateParam && states.find((s) => s.code === stateParam) ? stateParam : null;

  const [selectedState, setSelectedState] = useState<string | null>(preselectedState);

  // If guest already has a state selected, or state was provided via URL, skip step 1
  const guestHasState = isGuest && storeSelectedState;
  const hasPreselectedState = !!preselectedState;
  const [step, setStep] = useState<1 | 2>(guestHasState || hasPreselectedState ? 2 : 1);

  const handleStateSelect = () => {
    if (!selectedState) {
      setError(t("signup.pleaseSelectLocation"));
      return;
    }
    setError("");
    // Move to step 2 (credentials)
    setStep(2);
  };

  const handleGoogleSignIn = async () => {
    // For guests, use existing state; for preselected from URL or manual selection
    const stateToUse = guestHasState ? storeSelectedState : selectedState;
    if (!stateToUse) {
      setError(t("signup.pleaseSelectLocation"));
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Set email consent preference (default true for Google sign-in)
      setStoreEmailConsent(true);
      
      await loginWithGoogle();
      // Only set state if not a guest (guests already have state set)
      if (!guestHasState) {
        setStoreState(stateToUse);
      }
      // Wait for user data to load before redirecting
      await new Promise(resolve => setTimeout(resolve, 800));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError(t("signup.passwordsDontMatch"));
    }

    if (password.length < 6) {
      return setError(t("signup.passwordTooShort"));
    }

    setLoading(true);

    try {
      // Set email consent preference before creating account
      setStoreEmailConsent(emailConsent);
      
      // Create user account
      await signup(email, password);
      // Only set state if not a guest (guests already have state set)
      if (!guestHasState) {
        setStoreState(selectedState!);
      }

      // Small delay to ensure state is saved
      await new Promise(resolve => setTimeout(resolve, 100));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      setLoading(false);
    }
  };


  if (step === 1) {
    return (
      <div className="bg-white relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative text-center space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 text-2xl md:text-3xl font-medium text-gray-800">
            <span>{t("signup.iNeedToPass")}</span>
            <Select onValueChange={setSelectedState} value={selectedState || undefined}>
              <SelectTrigger className="w-auto inline-flex text-2xl md:text-3xl font-semibold text-brand border-none shadow-none focus:ring-0 focus:ring-offset-0 px-1 underline decoration-brand-border decoration-2 underline-offset-4 hover:decoration-brand h-auto">
                <SelectValue placeholder={t("signup.selectLocation")} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>{t("signup.drivingTest")}</span>
          </div>

          <Button
            onClick={handleStateSelect}
            disabled={!selectedState || loading}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
          >
            {t("common.continue")}
          </Button>

          <div className="text-center text-sm text-gray-600">
            {t("common.alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-brand hover:underline font-semibold">
              {t("common.logIn")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
      <Card className="relative w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {guestHasState ? t("signup.saveYourProgress") : t("common.createAccount")}
          </CardTitle>
          <CardDescription className="text-center">
            {guestHasState
              ? t("signup.createFreeAccountCloud")
              : t("signup.signUpToStart")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Google Sign-In */}
            <WebViewGoogleWarning
              onGoogleSignIn={handleGoogleSignIn}
              disabled={loading}
            />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">{t("common.orSignUpWithEmail")}</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("common.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("common.password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("common.confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailConsent}
                    onChange={(e) => setEmailConsent(e.target.checked)}
                    className="mt-1 cursor-pointer"
                    disabled={loading}
                  />
                  <span>
                    I agree to receive helpful emails from TigerTest about my test preparation.{" "}
                    <Link href="/privacy" className="text-brand underline" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => guestHasState ? router.push("/dashboard") : setStep(1)}
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                  >
                    {guestHasState ? t("signup.continueAsGuest") : t("common.back")}
                  </Button>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
                    {loading ? t("signup.creatingAccount") : guestHasState ? t("signup.saveProgress") : t("common.createAccount")}
                  </Button>
                </div>
              </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="bg-white relative min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <SignupPageContent />
    </Suspense>
  );
}
