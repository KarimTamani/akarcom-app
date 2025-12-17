import {
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
import { Skeleton } from '@/components/ui/skeleton'
import { Property } from '@/lib/property'
import { usersColumns } from './property-columns'
import useFetchProperties, { PropertyFetchFilters } from '../hooks/use-fetch-properties'
import usePropertyQuery from '../hooks/use-get-property-types'
import { defaultPagination, useProperty } from '../context/property-context'
import { DataTablePagination } from '@/components/layout/table/data-table-pagination'
import { PropertyDataTableToolbar } from './property-data-table-toolbar'
import { useDebounce } from '@/hooks/use-debounce'

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
    isLoading?: boolean
}

// 👇 Add forwardRef here
export const PropertiesTable = forwardRef(function PropertiesTable(
    {  }: DataTableProps,
    ref
) {

    const [pagination, setPagination] = useState<PaginationState>(defaultPagination);

    const { propertyTypes } = usePropertyQuery()
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<PropertyFetchFilters>({
        query: "",
        status: "all"
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const { properties, setFilters, pageCount , isLoading } = useProperty();
    const searchFilters = useDebounce(columnFilters);
    const columns: ColumnDef<Property>[] = usersColumns(propertyTypes);

    useEffect(() => {
        setFilters({
            pagination,
            filters: searchFilters
        })
    }, [pagination, searchFilters])

    const table = useReactTable({
        data: properties,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,

            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,

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
    });

    return (
        <div className='space-y-4'>
            <PropertyDataTableToolbar
                filters={columnFilters}
                onChange={setColumnFilters}
                table={table}
            />
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
            {

                !isLoading && <DataTablePagination table={table} />
            }
        </div>
    )
})
