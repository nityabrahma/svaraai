'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { createScrapingJob } from '@/lib/local-storage-api';
import { useCollection } from '@/hooks/use-collection';

const newJobSchema = z.object({
  targetUrl: z.string().url('Please enter a valid URL.'),
});

type NewJobValues = z.infer<typeof newJobSchema>;

interface NewJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewJobDialog({ open, onOpenChange }: NewJobDialogProps) {
  const { refreshData } = useCollection('scrapingJobs');
  const form = useForm<NewJobValues>({
    resolver: zodResolver(newJobSchema),
    defaultValues: { targetUrl: '' },
  });

  const onSubmit = async (data: NewJobValues) => {
    await createScrapingJob(data.targetUrl);
    toast({
      title: 'Job created!',
      description: `Scraping job for ${data.targetUrl} has been queued.`,
    });
    refreshData();
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Scraping Job</DialogTitle>
          <DialogDescription>
            Enter the URL you want to scrape for leads.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/company-directory" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Creating...' : 'Create Job'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
