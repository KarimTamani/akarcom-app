import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'


import { useUserTypes } from '../data/users-data'
import { User } from '@/lib/user'
import { DataTableRowActions } from './data-table-row-actions'
import { DataTableColumnHeader } from '../../../../../components/layout/table/data-table-column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Facebook, PhoneOff } from 'lucide-react'
import { useTranslations } from 'next-intl'



export const usersColumns = (): ColumnDef<User>[] => {

    const userTypes = useUserTypes();
    const t = useTranslations("users.columns")

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'full_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("full_name")} />
            ),
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={row.original.picture_url} />
                        <AvatarFallback>{(row.getValue("full_name") as string).slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>

                    <LongText className='max-w-36'>{row.getValue('full_name')}</LongText>
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
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("email")} />
            ),
            cell: ({ row }) => (
                <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
            ),
            meta: {
                className: cn(
                    'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                    'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                    'sticky left-6 md:table-cell'
                ),
            },
        },

        {
            accessorKey: 'phone_number',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("phone_number")} className=' rtl:text-right'/>
            ),
            cell: ({ row }) => <div>{row.getValue('phone_number') ? row.getValue('phone_number') : <PhoneOff className='text-muted-foreground' size={16} />}</div>,
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
        {
            accessorKey: 'user_type',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("user_type")} className=' rtl:text-right'/>
            ),
            cell: ({ row }) => {
                const { user_type } = row.original
                const userType = userTypes.find(({ value }) => value === user_type)

                if (!userType) {
                    return null
                }

                return (
                    <Badge className='flex items-center gap-x-2 ' variant={"outline"}>
                        {userType.icon && (
                            <userType.icon size={16} className='text-muted-foreground' />
                        )}
                        <span className='text-sm capitalize'>   {userType.label}    </span>
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
                <DataTableColumnHeader column={column} title={t("action")} className=' rtl:text-right'/>
            ),
            cell: DataTableRowActions,
        },
    ]

    return columns;
}


/*


*/
