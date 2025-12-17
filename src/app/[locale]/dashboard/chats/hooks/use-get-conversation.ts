import { Conversation } from "@/lib/chat";
import api from "@/services/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"

const useGetConversation = (userId?: number | undefined) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversation, setConversation] = useState<Conversation | undefined>(undefined);

    const [count, setCount] = useState<number | undefined>(undefined)


    const fetch = useCallback(async (userId: number) => {
        setLoading(true);
        try {
            const response = await api.get("chat/message/" + userId);

            if (response && response.status == 200) {
                const { data } = response.data;
                setCount(response.data.count)
                setConversation(data);
                return data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }

        return undefined;

    }, [])

    const loadMore = useCallback(async (last_sent_at: Date) => {
        setLoading(true);
        try {
            const response = await api.get("chat/message/" + userId, {
                params: {
                    last_sent_at
                }
            });

            if (response && response.status == 200) {
                const { data } = response.data;
 
                if (data.messages.length > 0)
                    setConversation({
                        ...conversation,
                        messages: [
                            ...conversation?.messages ?? [],
                            ...data.messages ?? [],
                        ]
                    } as Conversation)
                return data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }

        return undefined;

    }, [userId, conversation])


    useEffect(() => {


        if (!userId)
            return;
        fetch(userId)
    }, [userId]);


    return {
        conversation,
        loading,
        fetch,
        setConversation,
        loadMore,
        count

    }
}

export default useGetConversation; 