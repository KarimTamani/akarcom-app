"use client"
import { useEffect, useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import useSearchUsers from '../hooks/use-search-users'
import { User } from '@/lib/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Spinner } from '@/components/ui/spinner'
import { useTranslations } from 'next-intl'
import useGetConversation from '../hooks/use-get-conversation'
import { useAuth } from '@/providers/auth-provider'


type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void ,
  onUserSelected : ( user : User) => void 
}
export function NewChat({ onOpenChange, open , onUserSelected }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

 

  const [query, setQuery] = useState<string>("");
  const searchableQuery = useDebounce(query, 200);

  const handleSelectUser = (user: User) => {
    if (selectedUser?.id == user.id) {
      setSelectedUser(undefined)
    } else {
      setSelectedUser(user);
    }

  }
  const handleRemoveUser = () => {
    setSelectedUser(undefined)
  }

  useEffect(() => {
    if (!open) {
      setSelectedUser(undefined)
    }
  }, [open])


  const { users, isFetching } = useSearchUsers(searchableQuery)

  const t = useTranslations("chat.new_chat");

  const openConversation =  () => {
    
    selectedUser &&  onUserSelected ( selectedUser)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted-foreground text-sm'>{t("to")}</span>
            {selectedUser && (
              <Badge key={selectedUser.id} variant='default'>
                {selectedUser.full_name}
                <button
                  className='ring-offset-background focus:ring-ring ml-1 rounded-full outline-hidden focus:ring-2 focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRemoveUser()
                    }
                  }}
                  onClick={() => handleRemoveUser()}
                >
                  <IconX className='text-muted-foreground hover:text-foreground h-3 w-3' />
                </button>
              </Badge>
            )}
          </div>
          <Command className='rounded-lg border'>
            <Input
              placeholder={t("placeholder")}
              className='text-foreground'
              value={query}
              onChange={(event: any) => setQuery(event.target.value)}
            />
            <CommandList>
              {
                !isFetching ?
                  <>
                    <CommandEmpty>{t("not_found")}</CommandEmpty>

                    <CommandGroup>
                      {users.map((user: User) => (
                        <CommandItem
                          key={user.id}
                          onSelect={() => handleSelectUser(user)}
                          className='flex items-center justify-between gap-2'
                        >
                          <div className='flex items-center gap-2'>

                            <Avatar>
                              <AvatarImage src={user.picture_url} alt={user.full_name} />
                              <AvatarFallback>{(user.full_name as string).slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div className='flex flex-col'>
                              <span className='text-sm font-medium'>
                                {user.full_name}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                {t("user_types." + user.user_type)}
                              </span>
                            </div>
                          </div>

                          {selectedUser?.id == user.id && (
                            <IconCheck className='h-4 w-4' />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                  :
                  <div className='flex w-full items-center justify-center h-20'>

                    <Spinner className='stroke-primary' />
                  </div>
              }

            </CommandList>
          </Command>
          <Button
            variant={'default'}
            onClick={openConversation}
            disabled={!selectedUser }
          >
            {t("chat")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
