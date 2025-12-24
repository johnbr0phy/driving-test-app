"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
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

function SignupPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();
  const setStoreState = useStore((state) => state.setSelectedState);
  const storeSelectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);

  // If guest already has a state selected, skip step 1
  const guestHasState = isGuest && storeSelectedState;
  const [step, setStep] = useState<1 | 2>(guestHasState ? 2 : 1);

  const handleStateSelect = () => {
    if (!selectedState) {
      setError("Please select a state");
      return;
    }
    setError("");
    // Move to step 2 (credentials)
    setStep(2);
  };

  const handleGoogleSignIn = async () => {
    // For guests, use existing state; otherwise require selection
    const stateToUse = guestHasState ? storeSelectedState : selectedState;
    if (!stateToUse) {
      setError("Please select a state first");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      // Only set state if not a guest (guests already have state set)
      if (!guestHasState) {
        setStoreState(stateToUse!);
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
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
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
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
        <div className="relative text-center space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 text-2xl md:text-3xl font-medium text-gray-800">
            <span>I need to pass the</span>
            <Select onValueChange={setSelectedState} value={selectedState || undefined}>
              <SelectTrigger className="w-auto inline-flex text-2xl md:text-3xl font-semibold text-orange-600 border-none shadow-none focus:ring-0 focus:ring-offset-0 px-1 underline decoration-orange-300 decoration-2 underline-offset-4 hover:decoration-orange-500 h-auto">
                <SelectValue placeholder="select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>driving test.</span>
          </div>

          <Button
            onClick={handleStateSelect}
            disabled={!selectedState || loading}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
          >
            Continue
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 hover:underline font-semibold">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <Card className="relative w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {guestHasState ? "Save Your Progress" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {guestHasState
              ? "Create a free account to save your progress to the cloud"
              : "Sign up to start practicing for your driving test"}
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
              <Button
                type="button"
                className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or sign up with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="password">Password</Label>
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
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => guestHasState ? router.push("/dashboard") : setStep(1)}
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                  >
                    {guestHasState ? "Continue as Guest" : "Back"}
                  </Button>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
                    {loading ? "Creating account..." : guestHasState ? "Save Progress" : "Create Account"}
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
