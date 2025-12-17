import { Conversation, Message } from "@/lib/chat";
import { User } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"

const useGetMyConversations = (offset?: number, limit?: number) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [count, setCount] = useState<number | undefined>(undefined);


    useEffect(() => { 
        setConversations([]) ; 
        return() => { 
            setConversations([])
        }
    } , [])
    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("chat/message/", {
                params: {
                    offset, limit
                }
            });

            if (response && response.status == 200) {
                const { data } = response.data;

                if (offset != 0 )
                setConversations([
                    ...conversations,
                    ...data
                ]);
                else 
                   setConversations(data);     
                setCount(response.data.count)
                return data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }



    }, [conversations, offset, limit])

    const addMessage = useCallback(async (conversationId: number, message: Message) => {

        const conversation: Conversation | undefined = conversations.find((c: Conversation) => c.id == conversationId);

        if (!conversation) {
            await fetch()
            return;
        }

        const previousMessages: Message[] = conversation?.messages ?? [] as Message[];
        setConversations([
            { ...conversation, messages: [message, ...previousMessages] },
            ...conversations.filter((c: Conversation) => c.id != conversationId)
        ])

    }, [conversations])

    useEffect(() => {
        fetch()
    }, [offset, limit]);


    return {
        conversations,
        loading,
        fetch,
        setConversations,
        addMessage , 
        count

    }
}

export default useGetMyConversations; 