import ScrapeJobsTable from "@/components/scraping/scrape-jobs-table";
import { Button } from "@/components/ui/button";
import { mockScrapeJobs } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function ScrapingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Scraping Jobs</h1>
          <p className="text-muted-foreground">
            Manage your automated scraping tasks and view their status.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>
      <ScrapeJobsTable data={mockScrapeJobs} />
    </div>
  );
}
