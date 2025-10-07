'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, getUser, LOCAL_STORAGE_USER_KEY } from '@/lib/local-storage-api';

// This is a mock auth hook for client-side prototyping.
// It does not provide real security.

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateUserFromStorage = useCallback(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // For the prototype, create a default user if none exists
      const defaultUser = {
        uid: 'default-user',
        orgId: 'default-org',
        email: 'user@example.com',
        displayName: 'Demo User',
        role: 'admin',
        photoURL: `https://i.pravatar.cc/150?u=user@example.com`,
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(defaultUser));
      setUser(defaultUser as any);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    updateUserFromStorage();
    window.addEventListener('storage', updateUserFromStorage);
    return () => {
      window.removeEventListener('storage', updateUserFromStorage);
    };
  }, [updateUserFromStorage]);

  const signOut = async () => {
    // In this prototype, signing out just navigates to the landing page.
    // The user will be "logged in" again on the next visit.
    router.push('/');
  };

  const refreshUser = () => {
    updateUserFromStorage();
  };

  // Mock implementations to avoid breaking component code
  const signUpWithEmail = async (name:any, email:any, password:any) => { console.log("Sign up attempted"); return user; };
  const signInWithEmail = async (email:any, password:any) => { console.log("Sign in attempted"); return user; };
  const signInWithGoogle = async () => { console.log("Google sign in attempted"); return user; };


  return {
    user,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    refreshUser,
  };
}
