'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrapeJob } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MoreHorizontal, PauseCircle, PlayCircle, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

type ScrapeJobsTableProps = {
  data: ScrapeJob[];
};

export default function ScrapeJobsTable({ data }: ScrapeJobsTableProps) {
  const getStatusBadge = (status: ScrapeJob['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500 text-white';
      case 'done':
        return 'bg-accent text-accent-foreground';
      case 'queued':
        return 'bg-yellow-500 text-white';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      case 'paused':
        return 'bg-muted-foreground text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="rounded-md border bg-card">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Target URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((job) => (
            <TableRow key={job.id}>
                <TableCell className="font-medium">{job.targetUrl}</TableCell>
                <TableCell>
                <Badge className={cn('capitalize', getStatusBadge(job.status))}>
                    {job.status}
                </Badge>
                </TableCell>
                <TableCell>
                {formatDistanceToNow(new Date(job.finishedAt || job.scheduledAt), { addSuffix: true })}
                </TableCell>
                <TableCell>{job.attempts}</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    {job.status === 'paused' && <DropdownMenuItem><PlayCircle className="mr-2 h-4 w-4" /> Resume</DropdownMenuItem>}
                    {job.status === 'running' && <DropdownMenuItem><PauseCircle className="mr-2 h-4 w-4" /> Pause</DropdownMenuItem>}
                    {(job.status === 'done' || job.status === 'failed') && <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" /> Rerun Job</DropdownMenuItem>}
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
