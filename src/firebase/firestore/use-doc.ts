'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentReference, DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


interface UseDoc<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDoc<T = DocumentData>(ref: DocumentReference<T> | null): UseDoc<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(ref,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ ...docSnapshot.data(), id: docSnapshot.id });
        } else {
          setData(null);
        }
        setLoading(false);
        setError(null);
      },
      async (err) => {
        console.error("Firestore snapshot error in useDoc:", err);
        const permissionError = new FirestorePermissionError({
            path: ref.path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading, error };
}
