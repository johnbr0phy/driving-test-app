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
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { AccountConflictDialog } from "@/components/AccountConflictDialog";
import { findUserByReferralCode, recordReferral, saveReferralCode } from "@/lib/referrals";

interface AccountConflict {
  user: User;
  wasGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, referralCode?: string | null) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (referralCode?: string | null) => Promise<void>;
  logout: () => Promise<void>;
  processReferral: (newUserId: string, referralCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  processReferral: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
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

  // Process a referral - called after a new user signs up with a referral code
  const processReferral = async (newUserId: string, referralCode: string) => {
    try {
      // Find the referrer by their referral code
      const referrerId = await findUserByReferralCode(referralCode);
      if (referrerId && referrerId !== newUserId) {
        // Record the referral and unlock Test 4 for the referrer
        await recordReferral(referrerId, newUserId);
        console.log('Referral recorded successfully! Referrer:', referrerId);
      } else {
        console.log('Referral code not found or self-referral attempted');
      }

      // Save the new user's own referral code for future referrals
      await saveReferralCode(newUserId);
    } catch (error) {
      console.error('Error processing referral:', error);
    }
  };

  const signup = async (email: string, password: string, referralCode?: string | null) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUserId = userCredential.user.uid;

    // Save the new user's referral code
    await saveReferralCode(newUserId);

    // Process referral if a code was provided
    if (referralCode) {
      await processReferral(newUserId, referralCode);
    }
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (referralCode?: string | null) => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const newUserId = userCredential.user.uid;

    // Check if this is a new user (no existing data)
    const hasData = await checkUserHasData(newUserId);
    if (!hasData) {
      // New user - save their referral code
      await saveReferralCode(newUserId);

      // Process referral if a code was provided
      if (referralCode) {
        await processReferral(newUserId, referralCode);
      }
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

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    processReferral,
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
