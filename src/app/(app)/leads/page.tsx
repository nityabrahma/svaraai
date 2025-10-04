'use client';

import { useState } from 'react';
import { collection, getFirestore, query, orderBy, limit, startAfter, endBefore, limitToLast, DocumentData, Query } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import LeadsTable from '@/components/leads/leads-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lead } from '@/lib/types';

const LEADS_PER_PAGE = 10;

export default function LeadsPage() {
  const { app } = useFirebase();
  const firestore = getFirestore(app);

  const [pagination, setPagination] = useState<{
    page: number;
    lastVisible: DocumentData | null;
    firstVisible: DocumentData | null;
  }>({
    page: 0,
    lastVisible: null,
    firstVisible: null,
  });

  const getLeadsQuery = () => {
    const baseQuery = query(
      collection(firestore, 'leads'),
      orderBy('createdAt', 'desc')
    );

    if (pagination.page > 0 && pagination.lastVisible) {
      return query(baseQuery, startAfter(pagination.lastVisible), limit(LEADS_PER_PAGE));
    }
    
    return query(baseQuery, limit(LEADS_PER_PAGE));
  };
  
  const [leadsQuery, setLeadsQuery] = useState<Query<Lead>>(getLeadsQuery as Query<Lead>);

  const { data: leads, loading } = useCollection<Lead>(leadsQuery, {
      onNewData: (snapshot) => {
        if (!snapshot.empty) {
            setPagination(prev => ({
                ...prev,
                firstVisible: snapshot.docs[0],
                lastVisible: snapshot.docs[snapshot.docs.length - 1],
            }));
        }
      }
  });

  const handleNextPage = () => {
    if (leads && leads.length === LEADS_PER_PAGE) {
        const nextPageQuery = query(
            collection(firestore, 'leads'),
            orderBy('createdAt', 'desc'),
            startAfter(pagination.lastVisible),
            limit(LEADS_PER_PAGE)
        );
        setLeadsQuery(nextPageQuery as Query<Lead>);
        setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 0) {
        const prevPageQuery = query(
            collection(firestore, 'leads'),
            orderBy('createdAt', 'desc'),
            endBefore(pagination.firstVisible),
            limitToLast(LEADS_PER_PAGE)
        );
        setLeadsQuery(prevPageQuery as Query<Lead>);
        setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Manage and review your scraped and enriched leads.</p>
      </div>
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <div className="rounded-md border">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="flex items-center justify-end">
            <Skeleton className="h-8 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <LeadsTable data={leads || []} />
           <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={pagination.page === 0}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={!leads || leads.length < LEADS_PER_PAGE}
                >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </>
      )}
    </div>
  );
}
