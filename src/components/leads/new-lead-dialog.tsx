'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { automaticallyScoreLeads } from '@/ai/flows/automatically-score-leads';
import { createLead } from '@/lib/local-storage-api';
import { useCollection } from '@/hooks/use-collection';

const newLeadSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  type: z.enum(['company', 'person']),
  domain: z.string().optional(),
  title: z.string().optional(),
  source: z.string().min(2, 'Source is required.'),
  summary: z.string().optional(),
});

type NewLeadValues = z.infer<typeof newLeadSchema>;

interface NewLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewLeadDialog({ open, onOpenChange }: NewLeadDialogProps) {
  const { user } = useUser();
  const { refreshData } = useCollection('leads');
  const form = useForm<NewLeadValues>({
    resolver: zodResolver(newLeadSchema),
    defaultValues: { name: '', type: 'company', domain: '', title: '', source: 'manual', summary: '' },
  });

  const onSubmit = async (data: NewLeadValues) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to create a lead.' });
      return;
    }
    
    try {
        const scoringToast = toast({ title: 'Scoring lead...', description: 'AI is calculating the lead score.'});
        const scoreResult = await automaticallyScoreLeads({
            leadId: '', // No ID yet
            validationData: {manualEntry: true},
            enrichmentData: data,
        });
        scoringToast.update({ id: scoringToast.id, title: 'Lead Scored!', description: `AI-assigned score: ${scoreResult.score}` });

        const leadData = {
          ...data,
          orgId: user.uid, // Using uid as orgId for simplicity
          status: 'new' as const,
          score: scoreResult.score,
        };
        
        await createLead(leadData);
        
        toast({
            title: 'Lead created!',
            description: `${data.name} has been added to your leads.`,
        });
        refreshData();
        form.reset();
        onOpenChange(false);
    } catch (error) {
      console.error('Error creating lead:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred while creating the lead.' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>Enter the details for the new lead below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Innovate Inc. or Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select lead type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="person">Person</SelectItem>
                    </SelectContent>
                   </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl><Input placeholder="e.g., website, referral" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('type') === 'company' ? (
                 <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Domain</FormLabel>
                        <FormControl><Input placeholder="e.g., innovate.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            ) : (
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl><Input placeholder="e.g., CTO" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            )}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl><Textarea placeholder="A brief summary of the lead..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Creating...' : 'Create Lead'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
