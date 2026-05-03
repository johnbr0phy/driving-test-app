'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseApp from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function OAuthLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <OAuthLoginContent />
    </Suspense>
  );
}

interface PendingInfo {
  clientName: string;
  scope: string;
}

function OAuthLoginContent() {
  const searchParams = useSearchParams();
  const pendingId = searchParams.get('pending') ?? '';

  const [pendingInfo, setPendingInfo] = useState<PendingInfo | null>(null);
  const [pendingError, setPendingError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alreadyAuthorized, setAlreadyAuthorized] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch display info for consent screen (does not consume the pending record).
  useEffect(() => {
    if (!pendingId) {
      setPendingError('Missing authorization request. Please return to the MCP client and try again.');
      setAuthLoading(false);
      return;
    }

    fetch(`/api/mcp/oauth/complete?pendingId=${encodeURIComponent(pendingId)}`)
      .then((res) => {
        if (!res.ok) return res.json().then((d) => Promise.reject(d.error ?? 'Request not found'));
        return res.json() as Promise<PendingInfo>;
      })
      .then((info) => {
        setPendingInfo(info);
      })
      .catch((err: unknown) => {
        setPendingError(
          typeof err === 'string' ? err : 'Invalid or expired authorization request.',
        );
      })
      .finally(() => setAuthLoading(false));
  }, [pendingId]);

  // If user is already signed in, complete the authorization immediately.
  useEffect(() => {
    if (!pendingId || pendingError) return;

    const auth = getAuth(firebaseApp);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && !alreadyAuthorized) {
        setAlreadyAuthorized(true);
        completeAuthorization(user.getIdToken());
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingId, pendingError]);

  async function completeAuthorization(idTokenPromise: Promise<string>) {
    setSubmitting(true);
    setFormError('');

    try {
      const idToken = await idTokenPromise;
      const res = await fetch('/api/mcp/oauth/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ pendingId }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? 'Authorization failed');
      }

      const { redirect_url } = (await res.json()) as { redirect_url: string };
      window.location.replace(redirect_url);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Authorization failed. Please try again.');
      setSubmitting(false);
      setAlreadyAuthorized(false);
    }
  }

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const auth = getAuth(firebaseApp);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await completeAuthorization(credential.user.getIdToken());
    } catch (err: unknown) {
      const code =
        err instanceof Error && 'code' in err ? (err as { code?: string }).code : undefined;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setFormError('Incorrect email or password.');
      } else if (code === 'auth/user-not-found') {
        setFormError('No account found with that email.');
      } else if (code === 'auth/too-many-requests') {
        setFormError('Too many attempts. Please wait a moment and try again.');
      } else {
        setFormError(err instanceof Error ? err.message : 'Sign in failed.');
      }
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setFormError('');
    setSubmitting(true);

    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      await completeAuthorization(credential.user.getIdToken());
    } catch (err: unknown) {
      const code =
        err instanceof Error && 'code' in err ? (err as { code?: string }).code : undefined;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setFormError('');
      } else {
        setFormError(err instanceof Error ? err.message : 'Google sign in failed.');
      }
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (pendingError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Invalid Link</CardTitle>
            <CardDescription className="text-center">{pendingError}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const clientName = pendingInfo?.clientName ?? 'an MCP client';

  if (alreadyAuthorized || submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Authorizing...</CardTitle>
            <CardDescription className="text-center">
              Completing authorization for {clientName}.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white relative flex flex-1 items-center justify-center py-12 px-4 min-h-screen">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
      <Card className="relative w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Authorize Access</CardTitle>
          <CardDescription className="text-center">
            Sign in to authorize <span className="font-semibold">{clientName}</span> to access your
            TigerTest data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {formError}
              </div>
            )}

            {/* Google Sign-In */}
            <Button
              type="button"
              className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
              onClick={handleGoogleSignIn}
              disabled={submitting}
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
                <span className="bg-white px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitting}
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
                  disabled={submitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={submitting}
              >
                {submitting ? 'Signing in...' : 'Sign in and Authorize'}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-500">
              By signing in, you allow {clientName} to read and update your TigerTest practice test
              progress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
