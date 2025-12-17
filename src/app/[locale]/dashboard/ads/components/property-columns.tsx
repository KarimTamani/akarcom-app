import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { User } from '@/lib/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Facebook, PhoneOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DataTableColumnHeader } from '@/components/layout/table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Property, PropertyStatus, PropertyType } from '@/lib/property'
import { useProperty } from '../context/property-context'
import { DataTableFavoriteToggle } from '../../favorite/components/data-table-favorite-toggle'
 


export const usersColumns = (propertyTypes: PropertyType[]): ColumnDef<Property>[] => {

    const t = useTranslations("ads.columns")
    const flatTypes: PropertyType[] = propertyTypes.flatMap((propertyType: PropertyType) => propertyType.other_property_types);
    const { favorite } = useProperty();

    const columns: ColumnDef<Property>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("title")} />
            ),
            cell: ({ row }) => (
                <div className='flex items-center gap-2 '>
                    <LongText >{row.getValue('title')}</LongText>
                </div>
            ),
            meta: {
                className: cn(
                    'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                    'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                    'sticky left-6 md:table-cell'
                ),
            },
            enableHiding: false,
        },

        {
            accessorKey: 'users',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("created_by")} />
            ),
            cell: ({ row }) => {
                const user: User = row.getValue("users");

                return <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={user.picture_url} />
                        <AvatarFallback>{user.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>

                    <LongText className='max-w-36'>{user.full_name}</LongText>
                </div>

            },
            meta: {
                className: cn(
                    'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                    'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                    'sticky left-6 md:table-cell'
                ),
            },
        },

        {
            accessorKey: 'property_type_id',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("property_type_id")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => {
                const property_type_id = row.getValue("property_type_id");

                const propertyType: PropertyType | undefined = flatTypes.find((type: PropertyType) => type.id == property_type_id) as PropertyType;

                if (!propertyType) {
                    return <div>
                        Uknown type
                    </div>
                }
                return <Badge className='flex items-center gap-x-2 ' variant={"outline"}>{propertyType.name}</Badge>
            },
            enableSorting: false,
        },
        {
            accessorKey: 'add_type',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("add_type")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => <Badge variant={"secondary"} className='flex items-center gap-x-2 '>{
                t(`ad_types.${row.getValue('add_type')}`)

            }</Badge>,
            enableSorting: false,
        },
        {
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("address")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => <div>{row.getValue('address') ? row.getValue('address') : <PhoneOff className='text-muted-foreground' size={16} />}</div>,
            enableSorting: false,
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("created_at")} />
            ),
            cell: ({ row }) => {

                const date = new Date(row.original.created_at);
                const formatted = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });


                return < div className='w-fit text-nowrap' > {formatted}</div >
            },
        },

    ]

    if (!favorite) {
        columns.push({
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("status")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status");
                let bgClass: string | undefined;
                if (status == PropertyStatus.published) {
                    bgClass = "bg-primary text-white"
                }

                if (status == PropertyStatus.closed) {
                    bgClass = "bg-chart-4 text-white"
                }
                if (status == PropertyStatus.rejected) {
                    bgClass = "bg-chart-1 text-white"
                }

                return (
                    <Badge className={cn('flex items-center gap-x-2 ', bgClass)} variant={"outline"}>
                        <span className='text-sm capitalize'> {t(`property_status.${row.getValue("status")}`)}    </span>
                    </Badge>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            enableSorting: false,
            enableHiding: false,
        },
            {
                id: 'actions',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title={t("actions")} className=' rtl:text-right' />
                ),
                cell: DataTableRowActions,
            },)
    }

    else {
        columns.push({
            id: 'actions',
            header: ({ column }) => (
         
                  <DataTableColumnHeader column={column} title={t("actions")} className=' rtl:text-right' />
              ),
            cell: DataTableFavoriteToggle,
        })
    }
    return columns;
}


/*


*/
