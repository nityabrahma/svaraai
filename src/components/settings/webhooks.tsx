'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import type { Webhook } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const initialWebhooks: Webhook[] = [
  {
    id: 'wh_1',
    url: 'https://api.example.com/webhook/leads',
    active: true,
    events: ['lead.created', 'lead.verified'],
  },
  {
    id: 'wh_2',
    url: 'https://crm.my-company.com/api/v1/lead-ingest',
    active: false,
    events: ['lead.converted'],
  },
];

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState(initialWebhooks);

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Webhooks</CardTitle>
                <CardDescription>
                Deliver verified leads directly to your applications.
                </CardDescription>
            </div>
            <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Webhook
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <div className="font-mono text-sm">{webhook.url}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {webhook.events.map(event => <Badge variant="secondary" key={event}>{event}</Badge>)}
                    </div>
                    </TableCell>
                  <TableCell>
                    <Badge variant={webhook.active ? 'default' : 'outline'} className={cn({'bg-accent text-accent-foreground': webhook.active})}>
                      {webhook.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Send Test</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
