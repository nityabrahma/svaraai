'use client';

import { useEffect, useState, useCallback } from 'react';
import { UserProfile } from '@/lib/types';
import { LOCAL_STORAGE_USER_KEY } from '@/lib/local-storage-api';

interface UseUser {
  user: UserProfile | null;
  loading: boolean;
}

export const useUser = (): UseUser => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
    // Listen for login/logout events from other tabs
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, [checkUser]);


  return { user, loading };
};
