"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";

function InlineAuth() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const hasState = useStore.getState().selectedState;
      router.push(hasState ? "/dashboard" : "/onboarding/select-state");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    router.push(`/signup?email=${encodeURIComponent(email.trim())}`);
  };

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm w-full">
          {error}
        </div>
      )}

      <WebViewGoogleWarning
        onGoogleSignIn={handleGoogleSignIn}
        disabled={loading}
      />

      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            {t("common.or")}
          </span>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit} className="w-full space-y-3">
        <Input
          type="email"
          placeholder={t("common.enterYourEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="h-11"
        />
        <Button
          type="submit"
          className="w-full bg-gray-900 text-white hover:bg-gray-800 h-11 text-base"
          disabled={loading}
        >
          {t("common.startPracticing")} →
        </Button>
      </form>

      <button
        onClick={handleTryFree}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        {t("common.tryItFirst")}
      </button>
    </div>
  );
}

export function HomeHero() {
  const { user, loading } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      {!loading && (user || isGuest) ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
      ) : (
        <InlineAuth />
      )}

      {/* Product Screenshots */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/mobile.png"
              alt="TigerTest mobile DMV practice test training mode"
              width={280}
              height={560}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.trainOnMobile")}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/desktop.png"
              alt="TigerTest desktop DMV practice test interface"
              width={700}
              height={480}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.testOnDesktop")}</p>
        </div>
      </div>
    </>
  );
}

export function HomeCTA() {
  const { user, loading } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();

  return (
    <>
      {!loading && (user || isGuest) ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
      ) : (
        <InlineAuth />
      )}
    </>
  );
}
