import LeadsTable from "@/components/leads/leads-table";
import { mockLeads } from "@/lib/data";
import { Lead } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, PersonStanding } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
    // This is a simplified version. A real app would use the full data table component.
    // For this exercise, a simple table is sufficient to show the page structure.
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Manage and review your scraped and enriched leads.</p>
      </div>
      <LeadsTable data={mockLeads} />
    </div>
  );
}
