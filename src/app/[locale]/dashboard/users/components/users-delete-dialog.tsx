'use client'

import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

import { TriangleAlert } from 'lucide-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { User } from '@/lib/user'
import api from '@/services/api'
import axios from 'axios'
import { useUsers } from '../context/users-context'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const { onRefresh } = useUsers();

  const t = useTranslations();


  const handleDelete = async () => {


    if (value.trim() !== currentRow.full_name) return

    setLoading(true);
    try {
      const response = await api.delete("/users/" + currentRow.id);

      toast(t("users.success.user_deleted.title"), {
        description: t("users.success.user_deleted.description"),
        className: "!text-primary",
        descriptionClassName: "!text-primary/80"
      })

      onOpenChange(false)
      onRefresh && onRefresh();

    } catch (error) {
      if (axios.isAxiosError(error)) {

        toast(t("users.errors.failed_to_delete_user.title"), {
          description: t("users.errors.failed_to_delete_user.description"),
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
      disabled={value.trim() !== currentRow.full_name || loading}
      title={
        <span className='text-destructive'>
          <TriangleAlert
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t("users.dialogs.delete_user")}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2 rtl:text-right'>
            {t("users.dialogs.sure")}{' '}
            <span className='font-bold'>{currentRow.full_name}</span>
            <br />
            {t("users.dialogs.action")}{' '}
            <span className='font-bold'>
              {currentRow.user_type.toUpperCase()}
            </span>{' '}
            {t("users.dialogs.from_system")}
          </p>
          <Label className='my-2 '>
            <span className='min-w-24'>
              {t("users.dialogs.full_name")} :
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("users.dialogs.full_name_placeholder")}
            />
          </Label>
          <Alert variant='destructive' className='rtl:text-right'>
            <AlertTitle>{t("users.dialogs.warning")}</AlertTitle>
            <AlertDescription>
              {t("users.dialogs.warning_description")}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t("users.dialogs.delete")}
      cancelBtnText={t("users.dialogs.cancel")}
      destructive
    />
  )
}
