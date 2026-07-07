"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { AccountConflictDialog } from "@/components/AccountConflictDialog";

interface AccountConflict {
  user: User;
  wasGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// Mobile browsers (Chrome on iOS especially) don't reliably preserve the
// popup tab's sessionStorage across the Google round trip, which breaks
// signInWithPopup with auth/missing-initial-state. The auth helper is
// served same-origin (see lib/firebase.ts + next.config.ts rewrites), so
// the full-page redirect flow is reliable there — use it on mobile.
function shouldUseRedirectSignIn(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

async function sendWelcomeEmail(userId: string, email: string, displayName: string | null, emailConsent: boolean) {
  try {
    await fetch("/api/send-welcome-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email, displayName, emailConsent }),
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountConflict, setAccountConflict] = useState<AccountConflict | null>(null);
  const loadUserData = useStore((state) => state.loadUserData);
  const setUserId = useStore((state) => state.setUserId);
  const setPhotoURL = useStore((state) => state.setPhotoURL);
  const photoURL = useStore((state) => state.photoURL);
  const convertGuestToUser = useStore((state) => state.convertGuestToUser);
  const checkUserHasData = useStore((state) => state.checkUserHasData);
  const clearAllDataOnLogout = useStore((state) => state.clearAllDataOnLogout);

  const handleUseExistingAccount = useCallback(async () => {
    if (!accountConflict) return;

    const { user } = accountConflict;

    // Clear guest data and load existing account data
    clearAllDataOnLogout();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('driving-test-storage');
    }

    // Load existing user data from Firestore
    await loadUserData(user.uid);

    // If user has a Google photo and no custom photo is set, use Google photo
    const currentPhotoURL = useStore.getState().photoURL;
    if (user.photoURL && !currentPhotoURL) {
      setPhotoURL(user.photoURL);
    }

    setAccountConflict(null);
    setLoading(false);
  }, [accountConflict, clearAllDataOnLogout, loadUserData, setPhotoURL]);

  const handleCancelConflict = useCallback(async () => {
    // Sign out and let user try with different account
    setAccountConflict(null);
    await signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if this was a guest session being converted
        const wasGuest = useStore.getState().isGuest;

        if (wasGuest) {
          // Check if this account already has saved data
          const hasExistingData = await checkUserHasData(user.uid);

          if (hasExistingData) {
            // Show conflict dialog - don't proceed until user chooses
            setAccountConflict({ user, wasGuest });
            return; // Don't set loading to false yet
          }

          // No existing data - safe to convert guest to user
          await convertGuestToUser(user.uid);

          // If user has a Google photo and no custom photo is set, use Google photo
          if (user.photoURL && !photoURL) {
            setPhotoURL(user.photoURL);
          }
        } else {
          // Load user data from Firestore (normal login)
          await loadUserData(user.uid);

          // If user has a Google photo and no custom photo is set, use Google photo
          if (user.photoURL && !photoURL) {
            setPhotoURL(user.photoURL);
          }
        }
      } else {
        // Clear user data when logged out
        setUserId(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [loadUserData, setUserId, setPhotoURL, photoURL, convertGuestToUser, checkUserHasData]);

  useEffect(() => {
    // Completes the mobile signInWithRedirect flow. Resolves null on
    // ordinary loads; only returns a result right after the auth handler
    // redirects back. Signed-in state itself arrives via onAuthStateChanged.
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const additionalInfo = getAdditionalUserInfo(result);
          if (additionalInfo?.isNewUser) {
            sendWelcomeEmail(result.user.uid, result.user.email!, result.user.displayName, true);
          }
        }
      })
      .catch((err) => {
        console.error("Google redirect sign-in failed:", err);
      });
  }, []);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      // Send verification email
      sendEmailVerification(userCredential.user).catch(err => console.error('Failed to send verification email:', err));
      // Send welcome email via Resend
      sendWelcomeEmail(userCredential.user.uid, email, userCredential.user.displayName, true);
    }
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (shouldUseRedirectSignIn()) {
      // Full-page redirect: this promise never resolves — the browser
      // navigates away, and the result is picked up by the
      // getRedirectResult effect when the app loads again.
      await signInWithRedirect(auth, provider);
      return;
    }
    const result = await signInWithPopup(auth, provider);
    // Send welcome email for new Google signups only
    const additionalInfo = getAdditionalUserInfo(result);
    if (result.user && additionalInfo?.isNewUser) {
      sendWelcomeEmail(result.user.uid, result.user.email!, result.user.displayName, true);
    }
  };

  const logout = async () => {
    // Clear all store data (in-memory state)
    useStore.getState().clearAllDataOnLogout();
    // Clear localStorage to remove persisted data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('driving-test-storage');
    }
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AccountConflictDialog
        open={accountConflict !== null}
        onUseExisting={handleUseExistingAccount}
        onCancel={handleCancelConflict}
        userEmail={accountConflict?.user.email || undefined}
      />
    </AuthContext.Provider>
  );
}
