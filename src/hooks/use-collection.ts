'use client';

import { useState, useEffect, useCallback } from 'react';

// A generic key for our storage event bus
const STORAGE_EVENT_KEY = 'storage_update';

function dispatchStorageEvent() {  
  window.dispatchEvent(new Event(STORAGE_EVENT_KEY));
}

// Hook to read a collection from localStorage and subscribe to updates.
export function useCollection<T = any>(collectionName: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    try {
      const item = window.localStorage.getItem(collectionName);
      setData(item ? JSON.parse(item) : []);
    } catch (error) {
      console.error(`Error reading collection "${collectionName}" from localStorage`, error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    refreshData();
    
    // Listen for custom storage events to re-fetch data
    window.addEventListener(STORAGE_EVENT_KEY, refreshData);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener(STORAGE_EVENT_KEY, refreshData);
    };
  }, [refreshData]);

  return { data, loading, refreshData, dispatchStorageEvent };
}
