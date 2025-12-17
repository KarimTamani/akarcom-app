
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {  X } from 'lucide-react' 
import { useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PropertyFetchFilters } from '../hooks/use-fetch-properties'


interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    filters: PropertyFetchFilters,
    onChange: (filters: PropertyFetchFilters) => void,
}

export function PropertyDataTableToolbar<TData>({
    table,
    filters,
    onChange
}: DataTableToolbarProps<TData>) {

    const t = useTranslations("ads");
    const clear = () => {
        onChange({
            query : "" , 
            status : "all"
        }) 
    }
    const isFiltered = (filters.query && filters.query?.trim().length > 0) ||  filters?.status != "all";
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
                <Input
                    placeholder={t("columns.filter")}
                    value={
                        filters.query
                    }
                    onChange={(event) =>
                        onChange({
                            status: filters.status,
                            query: event.target.value
                        })
                    }
                    className='h-8 w-[150px] lg:w-[250px]'
                />
                <div className='flex gap-x-2'>
                    {
                        table.getColumn('status') && (
                            <Select value={filters.status} onValueChange={(value: string) => onChange({
                                status: value as any,
                                query: filters.query
                            })}>
                                <SelectTrigger className='w-36 '>
                                    <SelectValue>{t(`columns.property_status.${filters.status}`)}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'> {t("columns.property_status.all")} </SelectItem>
                                    <SelectItem value='draft'>{t("columns.property_status.draft")}</SelectItem>
                                    <SelectItem value='published'>{t("columns.property_status.published")}</SelectItem>
                                    <SelectItem value='closed'>{t("columns.property_status.closed")}</SelectItem>
                                    <SelectItem value='rejected'>{t("columns.property_status.rejected")}</SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }
                </div>
                {isFiltered && (
                    <Button
                        variant='ghost'
                        onClick={clear}
                        className='h-8 px-2 lg:px-3'
                    >
                        {t("columns.reset")}
                        <X className='ml-2 h-4 w-4' />
                    </Button>
                )}
            </div>
        </div>
    )
}
