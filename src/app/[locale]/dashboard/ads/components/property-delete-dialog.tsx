'use client'

import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

import { TriangleAlert } from 'lucide-react'
import { User } from '@/lib/user'
import api from '@/services/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Property } from '@/lib/property'
import { useProperty } from '../context/property-context'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Property
}

export function PropertyDeleteDialog({ open, onOpenChange, currentRow }: Props) {

  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useProperty()
  const t = useTranslations();

  const handleDelete = async () => {

    setLoading(true);
    try {
      const response = await api.delete("/property/" + currentRow.id);

      toast(t("ads.toast.property_deleted.title"), {
        description: t("ads.toast.property_deleted.description"),
        className: "!text-primary",
        descriptionClassName: "!text-primary/80"
      })

      onOpenChange(false)
      refresh();

    } catch (error) {
      if (axios.isAxiosError(error)) {

        toast(t("ads.toast.property_deleted_fail.title"), {
          description: t("ads.toast.property_deleted_fail.description"),
          className: "!text-destructive",
          descriptionClassName: "!text-destructive"
        })
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={loading}
      title={
        <span className='text-destructive'>
          <TriangleAlert
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t("ads.dialogs.delete_property")}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2 rtl:text-right'>
            {t("ads.dialogs.sure")}{' '}
            <span className='font-bold'>{currentRow.title}</span>
            <br />
            {t("ads.dialogs.action")}{' '}

          </p>

        </div>
      }
      confirmText={t("users.dialogs.delete")}
      cancelBtnText={t("users.dialogs.cancel")}
      destructive
    />
  )
}
