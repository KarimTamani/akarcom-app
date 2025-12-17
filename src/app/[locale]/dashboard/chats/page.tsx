
"use client"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { format } from 'date-fns'
import {
  IconArrowLeft,
  IconDotsVertical,
  IconEdit,
  IconMessages,
  IconPaperclip,
  IconPhone,
  IconPhotoPlus,
  IconPlus,
  IconSearch,
  IconSend,
  IconVideo,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { NewChat } from './components/new-chat'
import { type ChatUser, type Convo } from './data/chat-types'
// Fake Data 
import { User } from '@/lib/user'
import useGetMyConversations from './hooks/use-get-conversations'
import { Conversation, Message } from '@/lib/chat'
import { useAuth } from '@/providers/auth-provider'
import useGetConversation from './hooks/use-get-conversation'
import { Spinner } from '@/components/ui/spinner'
import axios from 'axios'
import api from '@/services/api'
import { EVENTS, getSocket } from '@/services/socket'
import { useTranslations } from 'next-intl'

const PAGE_SIZE = 20;




const DEFAULT_PAGINATION = {
  offset: 0,
  limit: PAGE_SIZE
}


const ChatPage: React.FC = ({ }) => {

  const [search, setSearch] = useState('')
  const [message, setMessage] = useState<''>()
  const { user: currentUser } = useAuth();
  const [sending, setSending] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  let { conversation: selectedConversation, loading: loadingConversation, setConversation, loadMore, count } = useGetConversation(selectedUser?.id);

  if (!selectedConversation && !loadingConversation && selectedUser) {
    selectedConversation = {
      user_id: selectedUser?.id as number,
      created_by: currentUser?.id as number,
      user: selectedUser as User,
      creator: currentUser as User,
      messages: []
    }
  };

  useEffect(() => {
    setMessage("");
  }, [selectedUser?.id])

  const [mobileSelectedConversation, setMobileSelectedConversation] = useState<Conversation | null>(
    null
  )
  const [createConversationDialogOpened, setCreateConversationDialog] =
    useState(false)

  const { conversations, loading, addMessage, count: countConversations } = useGetMyConversations(pagination.offset, pagination.limit)

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentMessage = selectedConversation?.messages.reduce(
    (acc: Record<string, Message[]>, obj) => {
      const key = format(obj.sent_at as Date, 'd MMM, yyyy')

      // Create an array for the category if it doesn't exist
      if (!acc[key]) {
        acc[key] = []
      }

      // Push the current object to the array
      acc[key].push(obj)
      return acc
    },
    {}
  )

  const openConversation = (user: User) => {
    setCreateConversationDialog(false);
    setSelectedUser(user);

  }


  useEffect(() => {
    if (!selectedUser?.id) return;
    try {

      api.put("/chat/message/read/" + selectedUser?.id)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }, [selectedUser?.id])

  const profile = selectedConversation?.creator?.id == currentUser?.id ? selectedConversation?.user : selectedConversation?.creator;

  const sendMessage = useCallback(async () => {

    if (!selectedUser)
      return;
    setSending(true);
    setMessage("");
    try {

      const response = await api.post("/chat/message", {
        content: message,
        receiver_id: selectedUser?.id
      })
      if (response && response.status == 200) {
        const { data } = response.data;

        const previousMessages: Message[] = selectedConversation?.messages ?? [] as Message[]
        setConversation({
          ...selectedConversation,
          messages: [
            ...data.messages as Message[],
            ...previousMessages
          ]
        } as Conversation);

        if (data.messages && data.messages.length > 0)
          addMessage(data.id, data.messages[0])
      }


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }

    } finally {
      setSending(false);
    }
  }, [setConversation, selectedUser, message, selectedConversation, addMessage]);



  const handleLoadMore = () => {
    const last_message = selectedConversation?.messages[selectedConversation?.messages.length - 1];
    if (last_message?.sent_at) {
      loadMore(last_message.sent_at)
    }
  }


  const loadMoreConversations = () => {
    setPagination({
      offset: pagination.offset + PAGE_SIZE,
      limit: PAGE_SIZE
    })
  }
  useEffect(() => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({
      behavior: 'auto', // instant, no animation
    });
  }, [selectedConversation?.id]);
  const { user, getToken } = useAuth();


  useEffect(() => {
    const token = getToken();
    if (!token)
      return;
    const socket = getSocket(token);
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Connected to socket server");
    });

    socket.on(EVENTS.NEW_MESSAGE, (conversation: Conversation) => {
      addMessage(conversation.id as number, conversation.messages[0]);

      setConversation(prev => {

        if (prev?.id == conversation.id)

          return {
            ...prev,
            messages: [
              ...conversation.messages as Message[],
              ...prev?.messages ?? [],
            ]
          } as Conversation
        else
          return prev;
      });

    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    return () => {
      socket.off(EVENTS.NEW_MESSAGE);
      socket.disconnect();
    };
  }, [user?.id]);

  const t = useTranslations("chat")
  return (
    <>
      {/* ===== Top Heading ===== */}


      <section className='flex h-full gap-6 p-4 '>
        {/* Left Side */}
        <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
          <div className='bg-background sticky top-0 z-10 -mx-4 px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
            <div className='flex items-center justify-between py-2'>
              <div className='flex gap-2'>
                <h1 className='text-2xl font-bold'>{t("inbox")}</h1>
                <IconMessages size={20} />
              </div>

              <Button
                size='icon'
                variant='ghost'
                onClick={() => setCreateConversationDialog(true)}
                className='rounded-lg'
              >
                <IconEdit size={24} className='stroke-muted-foreground' />
              </Button>
            </div>

           
          </div>

          <ScrollArea className='-mx-3 h-full overflow-x-hidden overflow-y-scroll p-3'>
            {conversations.map((conversation: Conversation) => {
              const { id, creator, user, messages } = conversation;
              const profile = creator?.id == currentUser?.id ? user : creator;

              const lastConvo = messages[0]
              const lastMsg =
                lastConvo.sender_id === currentUser?.id
                  ? `${t("you")}: ${lastConvo.content}`
                  : lastConvo.content;

              const notRead = lastConvo.read_at !== undefined && lastConvo.sender_id != currentUser?.id
              return (
                <Fragment key={id}>
                  <button
                    type='button'
                    className={cn(
                      `hover:bg-secondary/75 -mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm relative`,
                      selectedConversation?.id === id && 'sm:bg-muted'
                    )}
                    onClick={() => {
                      setSelectedUser(profile)
                      setMobileSelectedConversation(conversation)
                    }}
                  >
                    <div className='flex gap-2 '>
                      <Avatar>
                        <AvatarImage src={profile.picture_url} alt={profile.full_name} />
                        <AvatarFallback>{profile.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className={cn('col-start-2 row-span-2 font-medium ', notRead && "font-bold")}>
                          {profile.full_name}
                        </span>
                        <span className={cn('text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis', notRead && "font-bold")}>
                          {lastMsg}
                        </span>
                      </div>
                      {notRead && <span className='w-3 h-3 bg-primary absolute right-3 top-[50%] -translate-y-[50%] rounded-full'>
                      </span>}
                    </div>
                  </button>
                  <Separator className='my-1' />
                </Fragment>
              )
            })}
          </ScrollArea>
          {
            countConversations && conversations.length < countConversations &&
            <button className='underline text-primary py-4 cursor-pointer  flex items-center justify-center' disabled={loading} onClick={loadMoreConversations}>
              {!loading ? t("load_more") : <Spinner />}
            </button>
          }
        </div>

        {selectedConversation ? (
          <div
            className={cn(
              'bg-background absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex',
              mobileSelectedConversation && 'left-0 flex'
            )}
          >
            {/* Top Part */}
            <div className='bg-secondary mb-1 flex flex-none justify-between rounded-t-md p-4 shadow-lg'>
              {/* Left */}
              <div className='flex gap-3'>
                <Button
                  size='icon'
                  variant='ghost'
                  className='-ml-2 h-full sm:hidden'
                  onClick={() => setMobileSelectedConversation(null)}
                >
                  <IconArrowLeft />
                </Button>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <Avatar className='size-9 lg:size-11'>
                    <AvatarImage
                      src={profile?.picture_url}
                      alt={profile?.full_name}
                    />
                    <AvatarFallback>{profile?.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                      {profile?.full_name}
                    </span>
                    <span className='text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis lg:max-w-none lg:text-sm'>
                      {profile?.user_type}
                    </span>
                  </div>
                </div>
              </div>


            </div>

            {/* Conversation */}
            <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4 '>
              <div className='flex size-full flex-1'>
                <div className='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
                  <div className='chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pr-4 pb-4' >

                    {currentMessage &&
                      Object.keys(currentMessage).map((key) => (
                        <Fragment key={key}>
                          {currentMessage[key].map((msg, index) => (
                            <div
                              key={`${msg.users_messages_sender_idTousers?.id}-${msg.sent_at}-${index}`}
                              className={cn(
                                'chat-box max-w-72 px-3 py-2 break-words shadow-sm',
                                msg.users_messages_sender_idTousers?.id === currentUser?.id
                                  ? 'bg-primary/85 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]'
                                  : 'bg-secondary self-start rounded-[16px_16px_16px_0]'
                              )}
                            >
                              {msg.content}{' '}
                              <span
                                className={cn(
                                  'text-muted-foreground mt-1 block text-xs font-light italic',
                                  msg.users_messages_sender_idTousers.id === currentUser?.id && 'text-right'
                                )}
                              >
                                {format(msg.sent_at as Date, 'h:mm a')}
                              </span>
                            </div>
                          ))}
                          <div className='text-center text-xs'>{key}</div>
                        </Fragment>
                      ))}
                    {
                      count && selectedConversation.messages.length < count &&
                      <button className='underline text-primary py-4 cursor-pointer  flex items-center justify-center' disabled={loadingConversation} onClick={handleLoadMore}>
                        {!loadingConversation ? t("load_more") : <Spinner />}
                      </button>
                    }

                  </div>
                </div>
              </div>
              <div className='flex w-full flex-none gap-2'>
                <div className='border-input focus-within:ring-ring flex flex-1 items-center gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4'>

                  <label className='flex-1'>
                    <span className='sr-only'>Chat Text Box</span>
                    <input
                      type='text'
                      placeholder={t('type')}
                      className='h-8 w-full bg-inherit focus-visible:outline-hidden'
                      value={message}
                      onChange={(event: any) => setMessage(event.target.value)}
                      onKeyUp={(event: any) => {
                        if (event.key == "Enter") {
                          sendMessage()
                        }
                      }}
                    />
                  </label>

                  <Button
                    variant='ghost'
                    size='icon'
                    className='hidden sm:inline-flex'
                    onClick={sendMessage}
                    disabled={sending}
                  >
                    {sending ? <Spinner /> : <IconSend size={20} />}

                  </Button>
                </div>
                <Button className='h-full sm:hidden'>
                  <IconSend size={18} /> {t("send")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              ' absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex'
            )}
          >
            <div className='flex flex-col items-center space-y-6'>
              <div className='border-border flex size-16 items-center justify-center rounded-full border-2'>
                <IconMessages className='size-8' />
              </div>
              <div className='space-y-2 text-center'>
                <h1 className='text-xl font-semibold'>{t("your_messages")}</h1>
                <p className='text-muted-foreground text-sm'>
                  {t("start_chat")}
                </p>
              </div>
              <Button
                className='bg-primary px-6 text-white '
                onClick={() => setCreateConversationDialog(true)}
              >
                {t("send_message")}
              </Button>
            </div>
          </div>
        )}
      </section>
      <NewChat
        onUserSelected={openConversation}
        onOpenChange={setCreateConversationDialog}
        open={createConversationDialogOpened}
      />
    </>

  )
}


export default ChatPage; 