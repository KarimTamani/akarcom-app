
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useUserTypes } from '../data/users-data'
import { Cross, X } from 'lucide-react'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { useTranslations } from 'next-intl'


interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const userTypes = useUserTypes() ;  
    const isFiltered = table.getState().columnFilters.length > 0;
    const t = useTranslations("users") ;  
    const clear = () => {
        table.resetColumnFilters(); 
    }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
                <Input
                    placeholder= {t("toolbar.filter")}
                    value={
                        (table.getColumn('full_name')?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table.getColumn('full_name')?.setFilterValue(event.target.value)
                    }
                    className='h-8 w-[150px] lg:w-[250px]'
                />
                <div className='flex gap-x-2'>
                    {
                        table.getColumn('user_type') && (
                            <DataTableFacetedFilter
                                column={table.getColumn('user_type')}
                                title={t("toolbar.user_type")}
                                options={userTypes.map((t) => ({ ...t }))}
                            />
                        )
                    }

                </div>
                {isFiltered && (
                    <Button
                        variant='ghost'
                        onClick={clear}
                        className='h-8 px-2 lg:px-3'
                    >
                        {t("toolbar.reset")}
                        <X className='ml-2 h-4 w-4' />
                    </Button>
                )}
            </div>


            <DataTableViewOptions table={table} />

        </div>
    )
}
