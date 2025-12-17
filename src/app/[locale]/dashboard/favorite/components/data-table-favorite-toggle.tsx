
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, CirclePause, Ellipsis, Eye, EyeIcon, HeartIcon, Pencil, RotateCcw, Trash, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Property, PropertyStatus } from '@/lib/property'
import { useCallback, useEffect, useState } from 'react'
import api from '@/services/api'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { UserType } from '@/lib/user'
import { useProperty } from '../../ads/context/property-context'
import axios from 'axios'
import { cn } from '@/lib/utils'


interface DataTableRowActionsProps {
    row: Row<Property>
}

export function DataTableFavoriteToggle({ row }: DataTableRowActionsProps) {




    const property = row.original;



    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        setLiked(property != undefined && property.favorites?.length > 0);
    }, [property])


    const onLike = useCallback(async (like: boolean) => {
        try {
            const response = await api.put('property/favorite/' + property?.id)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            }
        }
        setLiked(like);
    }, [property]);
    return (
        <div className='flex gap-2'>
            <Button
                variant={"outline"}
                onClick={(event: any) => { event.preventDefault(); onLike(!liked) }}
                size={"icon"}
            >

                <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-foreground')} />
            </Button>

            <Button
                variant={"outline"}
                onClick={(event: any) => window.open("/property/" + row.original.slug, "_blank")}
                size={"icon"}
            >

                <EyeIcon className={cn('size-4')} />
            </Button>

        </div>
    )
}
