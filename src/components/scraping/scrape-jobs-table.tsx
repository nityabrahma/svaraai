'use client';

import React from 'react';
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
import { doc, deleteDoc, updateDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ScrapeJobsTableProps = {
  data: ScrapeJob[];
};

const JobActions = ({ job }: { job: ScrapeJob }) => {
    const { app } = useFirebase();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
    const [isUpdating, setIsUpdating] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const firestore = getFirestore(app);
        try {
            await deleteDoc(doc(firestore, 'scrapingJobs', job.id));
            toast({ title: 'Job deleted', description: `Job for ${job.targetUrl} has been deleted.` });
        } catch (error) {
            console.error('Error deleting job:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not delete job.' });
        } finally {
            setIsDeleting(false);
            setShowDeleteAlert(false);
        }
    };

    const handleUpdateStatus = async (status: ScrapeJob['status']) => {
        setIsUpdating(true);
        const firestore = getFirestore(app);
        try {
            const jobRef = doc(firestore, 'scrapingJobs', job.id);
            await updateDoc(jobRef, { status: status, updatedAt: serverTimestamp() });
            toast({ title: 'Job updated', description: `Job for ${job.targetUrl} is now ${status}.` });
        } catch (error) {
            console.error('Error updating job:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not update job status.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRerun = async () => {
        setIsUpdating(true);
        const firestore = getFirestore(app);
        try {
            const jobRef = doc(firestore, 'scrapingJobs', job.id);
            await updateDoc(jobRef, { 
                status: 'queued', 
                attempts: 0,
                updatedAt: serverTimestamp(),
                scheduledAt: serverTimestamp()
            });
            toast({ title: 'Job Rerunning', description: `Job for ${job.targetUrl} has been queued.` });
        } catch (error) {
            console.error('Error rerunning job:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not rerun job.' });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting || isUpdating}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {job.status === 'paused' && <DropdownMenuItem onClick={() => handleUpdateStatus('running')}><PlayCircle className="mr-2 h-4 w-4" /> Resume</DropdownMenuItem>}
                    {job.status === 'running' && <DropdownMenuItem onClick={() => handleUpdateStatus('paused')}><PauseCircle className="mr-2 h-4 w-4" /> Pause</DropdownMenuItem>}
                    {(job.status === 'done' || job.status === 'failed') && <DropdownMenuItem onClick={handleRerun}><RefreshCw className="mr-2 h-4 w-4" /> Rerun Job</DropdownMenuItem>}
                    <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteAlert(true)} disabled={isDeleting}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this scraping job.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};


export default function ScrapeJobsTable({ data }: ScrapeJobsTableProps) {
  const getStatusBadge = (status: ScrapeJob['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500 text-white';
      case 'done':
        return 'bg-green-500 text-white';
      case 'queued':
        return 'bg-yellow-500 text-black';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      case 'paused':
        return 'bg-muted-foreground text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
        const dateA = a.updatedAt || a.scheduledAt;
        const dateB = b.updatedAt || b.scheduledAt;
        if (!dateA || !dateB) return 0;
        return dateB.seconds - dateA.seconds;
    });
  }, [data]);

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
            {sortedData.map((job) => (
            <TableRow key={job.id}>
                <TableCell className="font-medium">{job.targetUrl}</TableCell>
                <TableCell>
                <Badge className={cn('capitalize', getStatusBadge(job.status))}>
                    {job.status}
                </Badge>
                </TableCell>
                <TableCell>
                 {job.updatedAt || job.scheduledAt ? formatDistanceToNow(new Date((job.updatedAt || job.scheduledAt).seconds * 1000), { addSuffix: true }) : 'N/A'}
                </TableCell>
                <TableCell>{job.attempts}</TableCell>
                <TableCell className="text-right">
                  <JobActions job={job} />
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
