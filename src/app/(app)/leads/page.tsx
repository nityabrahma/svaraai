'use client';

import LeadsTable from "@/components/leads/leads-table";
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, getFirestore } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeadsPage() {
    const { app } = useFirebase();
    const firestore = getFirestore(app);
    const { data: leads, loading } = useCollection(collection(firestore, 'leads'));

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
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-[200px]" />
            </div>
        </div>
      ) : (
        <LeadsTable data={leads || []} />
      )}
    </div>
  );
}
