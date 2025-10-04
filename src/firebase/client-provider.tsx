'use client';

import { ReactNode, useMemo } from 'react';
import { initializeFirebase, FirebaseProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseContext = useMemo(() => {
    return initializeFirebase();
  }, []);

  return (
    <FirebaseProvider {...firebaseContext}>
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
