'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface UseCollectionOptions<T> {
    onNewData?: (snapshot: QuerySnapshot<T>) => void;
}

interface UseCollection<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
}

export function useCollection<T = DocumentData>(
    query: Query<T> | null,
    options?: UseCollectionOptions<T>
): UseCollection<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const result: T[] = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(result);
        if (options?.onNewData) {
            options.onNewData(snapshot);
        }
        setLoading(false);
        setError(null);
      },
      async (err) => {
        console.error("Firestore snapshot error in useCollection:", err);
        const permissionError = new FirestorePermissionError({
            path: (query as any)._query.path.segments.join('/'),
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, error };
}
