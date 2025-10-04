'use client';

import { useState } from 'react';
import ScrapeJobsTable from "@/components/scraping/scrape-jobs-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NewJobDialog from '@/components/scraping/new-job-dialog';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, getFirestore } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { Skeleton } from '@/components/ui/skeleton';


export default function ScrapingPage() {
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false);
  const { app } = useFirebase();
  const firestore = getFirestore(app);
  const { data: scrapeJobs, loading } = useCollection(collection(firestore, 'scrapingJobs'));


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Scraping Jobs</h1>
          <p className="text-muted-foreground">
            Manage your automated scraping tasks and view their status.
          </p>
        </div>
        <Button onClick={() => setIsNewJobDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>
      {loading ? (
        <div className="rounded-md border">
            <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <ScrapeJobsTable data={scrapeJobs || []} />
      )}
      <NewJobDialog open={isNewJobDialogOpen} onOpenChange={setIsNewJobDialogOpen} />
    </div>
  );
}
