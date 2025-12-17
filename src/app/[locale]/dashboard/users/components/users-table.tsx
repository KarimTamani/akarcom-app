import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react'
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { User } from '@/lib/user'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from '../../../../../components/layout/table/data-table-pagination'
import { Skeleton } from '@/components/ui/skeleton'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        className: string
    }
}

export interface TablePagination {
    pageIndex: number
    pageSize: number
}

interface DataTableProps {
    columns: ColumnDef<User>[]
    data: User[]
    pagination: PaginationState
    setPagination: Dispatch<SetStateAction<PaginationState>>
    pageCount?: number
    onFiltersChange?: (filters: any[]) => Promise<void>
    isLoading?: boolean
}

// 👇 Add forwardRef here
export const UsersTable = forwardRef(function UsersTable(
    { columns, data, pagination, pageCount, setPagination, onFiltersChange, isLoading }: DataTableProps,
    ref
) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [handler, setHandler] = useState<any>(undefined);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        onPaginationChange: setPagination,
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        manualFiltering: true,
        pageCount: pageCount ?? 1,
    })



    useEffect(() => {

        if (handler)
            clearTimeout(handler)

        setHandler(
            setTimeout(() => {
                onFiltersChange && onFiltersChange(columnFilters)
            }, 500)
        )

    }, [columnFilters])

    // 👇 Expose functions to parent through ref
    useImperativeHandle(ref, () => ({
        reset() {
            // you can make this function do whatever you want
            // e.g. clear filters, sorting, pagination, etc.
            setRowSelection({})
            setColumnVisibility({})
            setColumnFilters([])
            setSorting([])
        },
    }))

    return (
        <div className='space-y-4'>
            <DataTableToolbar table={table} />
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
            {!isLoading && <DataTablePagination table={table} />}
        </div>
    )
})
