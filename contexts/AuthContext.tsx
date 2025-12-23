"use client";

import { createContext, useContext, useEffect, useState } from "react";
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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const loadUserData = useStore((state) => state.loadUserData);
  const setUserId = useStore((state) => state.setUserId);
  const setPhotoURL = useStore((state) => state.setPhotoURL);
  const photoURL = useStore((state) => state.photoURL);
  const convertGuestToUser = useStore((state) => state.convertGuestToUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if this was a guest session being converted
        const wasGuest = useStore.getState().isGuest;

        if (wasGuest) {
          // Convert guest session to registered user - keeps existing progress
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
  }, [loadUserData, setUserId, setPhotoURL, photoURL, convertGuestToUser]);

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
