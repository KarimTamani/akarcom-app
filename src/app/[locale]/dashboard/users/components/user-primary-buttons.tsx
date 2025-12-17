 
import { Button } from '@/components/ui/button' 
import { PlusIcon } from 'lucide-react'
import { useUsers } from '../context/users-context'
import { useTranslations } from 'next-intl';

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers() ; 
  const t = useTranslations("users") ; 
  return (
    <div className='flex gap-2'>
      
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>{t('add_user')}</span> <PlusIcon size={18} />
      </Button>
    </div>
  )
}
