import { ColumnDef, Row } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'



import { useTranslations } from 'next-intl'
import { DataTableColumnHeader } from '@/components/layout/table/data-table-column-header'

import { SubscriptionFeatures, SubscriptionPlan } from '@/lib/subscriptions'
import useGetFeatures from '../../../data/use-get-features'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useCallback } from 'react'
import { useSubscriptionPlan } from '../../../context/subscription-plan-context'
import { Checkbox } from '@/components/ui/checkbox'
import api from '@/services/api'



export const subscriptionPlanColumns = (): ColumnDef<SubscriptionPlan>[] => {

    const t = useTranslations("subscriptions.plans_columns");
    const features = useGetFeatures();
    const {  setOpen , setCurrentRow} = useSubscriptionPlan() ; 
    const openEditDialog = useCallback((planRow : Row<SubscriptionPlan>) => { 
        
        setCurrentRow(planRow.original) ; 
        setOpen(true)
    } , [])


    const updateActive = async  ( id : number ,  value : boolean) => { 
        try { 
            await api.put("/subscription/subscription_plan/"+id , {
                is_active : value 
            })
        }catch(error) { 

        }
    }


    const columns: ColumnDef<SubscriptionPlan>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("name")} />
            ),
            cell: ({ row }) => (
                <div className='flex items-center gap-2 '>
                    <LongText >{row.getValue('name')}</LongText>
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
            accessorKey: 'price',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("price")} />
            ),
            cell: ({ row }) => {
                return <div className='flex items-center gap-2 '>
                    <LongText >{row.getValue('price')} </LongText>
                </div>
            },
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
            accessorKey: 'max_properties',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("max_properties")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => {

                return <div className='flex items-center gap-2 '>
                    <LongText >{row.getValue('max_properties')} </LongText>
                </div>
            },
            enableSorting: false,
        },
        {
            accessorKey: 'features',
            enableHiding: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("features")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => {
                let allPlanFeatures: SubscriptionFeatures[] = row.getValue("features");
                const planFeatures = allPlanFeatures.slice(0, 3);
                const extraFeatures = allPlanFeatures.length - 3;

                return (
                    <>
                        {
                            planFeatures.map((feature: SubscriptionFeatures) =>
                                <Badge
                                    key={feature}
                                    className='mr-1' 
                                >
                                    {features.find((f: any) => f.id == feature)?.label}
                                </Badge>
                            )
                        }
                        {
                            extraFeatures >= 1 &&
                            <Badge >+ {extraFeatures}</Badge>
                        }
                    </>
                )
            },
        },
        {
            accessorKey: 'created_at',
            enableHiding: false,
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
            accessorKey: 'is_active',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("is_active")} className=' rtl:text-right' />
            ),
            cell: ({ row }) => {
                return <div className='flex items-center gap-2 '>
                    <Checkbox
                        defaultChecked={row.getValue('is_active')} 
                        onCheckedChange={(value : boolean) => updateActive(row.original.id ,  value)}
                    /> 
                </div>
            },
            enableSorting: false,
        },

        {
            accessorKey: 'actions',
            enableHiding: false,
            enableSorting: false,
      
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t("actions")} />
            ),
            cell: ({ row }) => (
                
                <Button variant={"outline"} size={"icon"} onClick={() => openEditDialog(row )}>
                    <Pencil/>
                </Button>
                
            ),
        },

    ]


    return columns;
}


/*


*/
