'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { Lead } from '@/lib/types'
import { Badge } from '../ui/badge'
import { Building, MoreHorizontal, PersonStanding, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { Checkbox } from '../ui/checkbox'
import { useFirebase } from '@/firebase/provider'
import { toast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { enrichLeadDataWithLLM } from '@/ai/flows/enrich-lead-data-with-llm'
import { deleteLead } from '@/firebase/firestore/api'

const LeadActions = ({ row }: { row: Row<Lead> }) => {
    const lead = row.original;
    const { firestore } = useFirebase();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isEnriching, setIsEnriching] = React.useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await deleteLead(firestore, lead.id);
        if (success) {
            toast({
                title: 'Lead deleted',
                description: `Lead "${lead.name}" has been deleted.`,
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Error deleting lead',
                description: 'An unexpected error occurred.',
            });
        }
        setIsDeleting(false);
        setShowDeleteAlert(false);
    };
    
    const handleEnrich = async () => {
        setIsEnriching(true);
        toast({
            title: 'Enriching lead...',
            description: `AI is enriching "${lead.name}". This may take a moment.`,
        });
        try {
            const result = await enrichLeadDataWithLLM({
                leadName: lead.name,
                leadDescription: lead.summary || '',
                existingData: {
                  type: lead.type,
                  domain: lead.domain,
                  title: lead.title,
                }
            });

            // Here you would typically update the lead in Firestore with `result.enrichedData`
            // For now, we'll just show a success toast with the summary
            console.log('Enrichment result:', result);

            toast({
                title: 'Lead enriched!',
                description: `AI summary: ${result.summary}`,
            });

        } catch (error) {
            console.error("Error enriching lead: ", error);
            toast({
                variant: 'destructive',
                title: 'Enrichment failed',
                description: 'The AI could not enrich the lead data.',
            });
        } finally {
            setIsEnriching(false);
        }
    };


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting || isEnriching}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild><Link href={`/leads/${lead.id}`}>View details</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEnrich} disabled={isEnriching}>
                        {isEnriching ? 'Enriching...' : 'Enrich with AI'}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteAlert(true)} disabled={isDeleting}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete lead
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this lead?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the lead "{lead.name}".
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


const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Lead',
    cell: ({ row }) => {
      const lead = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">{lead.name}</span>
          <span className="text-sm text-muted-foreground">{lead.domain || lead.title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue('type') === 'company' ? <Building className="mr-2 h-4 w-4" /> : <PersonStanding className="mr-2 h-4 w-4" />}
        {row.getValue('type')}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'verified' ? 'default' : status === 'converted' ? 'secondary' : 'outline'
          }
          className={cn(
            'capitalize',
            {'bg-accent text-accent-foreground hover:bg-accent/80': status === 'verified'},
            {'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800': status === 'converted'},
            {'border-dashed': status === 'new'},
            {'text-destructive border-destructive': status === 'invalid'}
          )}
        >
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => {
      const score = parseFloat(row.getValue('score'))
      const colorClass = score > 85 ? 'text-green-500' : score > 70 ? 'text-yellow-500' : 'text-muted-foreground'
      return <div className={cn('font-semibold', colorClass)}>{score}</div>
    }
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => <div className="capitalize">{row.getValue('source')?.replace('-', ' ')}</div>,
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <LeadActions row={row} />,
  },
]

export default function LeadsTable({ data }: { data: Lead[] }) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'score', desc: true }])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Remove pagination controls as they are now handled at page level */}
    </div>
  )
}
