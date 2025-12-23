
import useGetSubscriptionPlans from "./hooks/use-get-subscription-plans"
import { useState } from "react";


import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    RowData,
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
import { SubscriptionPlan } from "@/lib/subscriptions";
import { subscriptionPlanColumns } from "./componenets/susbcription-plan-columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscriptionPlan } from "../../context/subscription-plan-context";






const SubscriptionPlanTable: React.FC = ({ }) => {

    const [rowSelection, setRowSelection] = useState({})

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const {plans , isLoading} = useSubscriptionPlan()
    const columns: ColumnDef<SubscriptionPlan>[] = subscriptionPlanColumns();


    const table = useReactTable({
        data: plans,
        columns,
        state: {

            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,

        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),

        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: false,
        manualFiltering: false,

    });

    return (
        <div className='space-y-4'>
            
            <div className='overflow-hidden rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='group/row'>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={header.column.columnDef.meta?.className ?? ''}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className='h-8 w-[150px]' /></TableCell>
                                    <TableCell><Skeleton className='h-8 w-[100px]' /></TableCell>
                                    <TableCell><Skeleton className='h-8 w-[120px]' /></TableCell>
                                    <TableCell><Skeleton className='h-8 w-[120px]' /></TableCell>
                                    <TableCell><Skeleton className='h-8 w-[120px]' /></TableCell>
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className='group/row'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cell.column.columnDef.meta?.className ?? ''}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
            
        </div>
    )
}


export default SubscriptionPlanTable