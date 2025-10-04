'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, getUser, LOCAL_STORAGE_USER_KEY } from '@/lib/local-storage-api';

// This is a mock auth hook for client-side prototyping.
// Do not use this in a production environment.

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateUserFromStorage = useCallback(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    updateUserFromStorage();
    // Listen for storage changes from other tabs
    window.addEventListener('storage', updateUserFromStorage);
    return () => {
      window.removeEventListener('storage', updateUserFromStorage);
    };
  }, [updateUserFromStorage]);

  const signUpWithEmail = async (name, email, password) => {
    const existingUser = await getUser(email);
    if (existingUser) {
      throw new Error('This email is already registered. Please log in instead.');
    }
    // Note: Password is not used, just simulating the flow
    const newUser = await createUser(name, email);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signInWithEmail = async (email, password) => {
    const user = await getUser(email);
    if (!user) {
      // In a real app, you wouldn't distinguish between user not found and wrong password
      throw new Error('Invalid email or password.');
    }
    // Note: Password is not checked
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    setUser(user);
    return user;
  };

  const signInWithGoogle = async () => {
    // This is a mock. In a real app, this would involve a popup and OAuth flow.
    const mockGoogleUser = {
      displayName: 'Google User',
      email: `google-user-${Date.now()}@example.com`,
    };
    let user = await getUser(mockGoogleUser.email);
    if (!user) {
      user = await createUser(mockGoogleUser.displayName, mockGoogleUser.email);
    }
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    setUser(user);
    return user;
  };

  const signOut = async () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setUser(null);
    router.push('/login');
  };

  const refreshUser = () => {
    updateUserFromStorage();
  };

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
