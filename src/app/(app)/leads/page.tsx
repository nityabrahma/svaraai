'use client';

import { useState, useEffect, useMemo } from 'react';
import LeadsTable from '@/components/leads/leads-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lead } from '@/lib/types';
import { useCollection } from '@/hooks/use-collection';

const LEADS_PER_PAGE = 10;

export default function LeadsPage() {
  const { data: allLeads, loading } = useCollection<Lead>('leads');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!allLeads) return 0;
    return Math.ceil(allLeads.length / LEADS_PER_PAGE);
  }, [allLeads]);

  const leadsForCurrentPage = useMemo(() => {
    if (!allLeads) return [];
    const sortedLeads = [...allLeads].sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    const startIndex = (currentPage - 1) * LEADS_PER_PAGE;
    const endIndex = startIndex + LEADS_PER_PAGE;
    return sortedLeads.slice(startIndex, endIndex);
  }, [allLeads, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
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
          <LeadsTable data={leadsForCurrentPage} />
           <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center justify-end space-x-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                  >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage >= totalPages}
                  >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
              </div>
            </div>
        </>
      )}
    </div>
  );
}
