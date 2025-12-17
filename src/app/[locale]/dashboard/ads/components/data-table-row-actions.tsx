
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, CirclePause, Ellipsis, Eye, Pencil, RotateCcw, Trash, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useProperty } from '../context/property-context'
import { Property, PropertyStatus } from '@/lib/property'
import { useState } from 'react'
import api from '@/services/api'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { UserType } from '@/lib/user'


interface DataTableRowActionsProps {
  row: Row<Property>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow, updateProperty } = useProperty();
  const t = useTranslations("ads.columns");
  const [loading, setLoading] = useState<boolean>(false);
  const status = row.getValue("status");
  const { user } = useAuth();

  const changeStatus = async (status: PropertyStatus) => {
    try {

      setLoading(true)
      await api.put('property/' + row.original.id, {
        status
      });
      updateProperty(row.original.id as number, {
        status
      } as Property)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  };

  const router = useRouter();
  const highPreviligies: boolean = user?.user_type == UserType.admin || user?.user_type == UserType.employee;

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            {
              !loading ? <Ellipsis className='h-4 w-4' /> : <Spinner className='w-4 h-4' />
            }

            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              window.open("/property/" + row.original.slug, "_blank")

            }}
          >
            {t("preview")}
            <DropdownMenuShortcut>
              <Eye size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push("/dashboard/ads/edit/" + row.original.id);
            }}
          >
            {t("edit")}
            <DropdownMenuShortcut>
              <Pencil size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {
            status == PropertyStatus.draft && highPreviligies &&
            <DropdownMenuItem
              onClick={
                () => changeStatus(PropertyStatus.published)
              }
            >
              {t("approuve")}
              <DropdownMenuShortcut>
                <Check size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          }

          {
            (status == PropertyStatus.draft || status == PropertyStatus.closed) && highPreviligies &&
            <DropdownMenuItem
              onClick={
                () => changeStatus(PropertyStatus.rejected)
              }
            >
              {t("reject")}
              <DropdownMenuShortcut>
                <X size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          }


          {
            (status == PropertyStatus.published) &&
            <DropdownMenuItem
              onClick={
                () => changeStatus(PropertyStatus.closed)
              }
            >
              {t("stop")}
              <DropdownMenuShortcut>
                <CirclePause size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          }

          {
            (status == PropertyStatus.closed || status == PropertyStatus.rejected) &&
            <DropdownMenuItem
              onClick={
                () => changeStatus(status == PropertyStatus.rejected ? PropertyStatus.draft : PropertyStatus.published)
              }

            >
              {t("re_publish")}
              <DropdownMenuShortcut>
                <RotateCcw size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          }
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            {t("delete")}
            <DropdownMenuShortcut>
              <Trash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
