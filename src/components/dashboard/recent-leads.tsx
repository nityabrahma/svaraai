import Link from 'next/link';
import { ArrowUpRight, PersonStanding, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockLeads } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function RecentLeads() {
    const recentLeads = mockLeads.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">Recent Leads</CardTitle>
          <CardDescription>
            You've acquired {mockLeads.length} leads this month.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/leads">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                    <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                        {lead.domain || lead.title}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="capitalize">
                            {lead.type === 'company' ? <Building className="mr-2 h-4 w-4" /> : <PersonStanding className="mr-2 h-4 w-4" />}
                            {lead.type}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge
                        variant={
                            lead.status === 'verified' ? 'default' : lead.status === 'converted' ? 'secondary' : 'outline'
                        }
                        className={cn(
                            {'bg-accent text-accent-foreground hover:bg-accent/80': lead.status === 'verified'},
                            {'bg-blue-500 text-white': lead.status === 'converted'}
                        )}
                        >
                        {lead.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">{lead.score}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
