import { Conversation, Message } from "@/lib/chat";
import { Ticket, tickets_status_enum } from "@/lib/ticket";
import { User } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"

const useGetTickets = (pagination : any , faq? : boolean) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [count, setCount] = useState<number | undefined>(undefined);

    useEffect(() => { 
        setTickets([]) ; 
        return() => { 
            setTickets([])
        }
    } , [])
    const fetch = useCallback(async ( ) => {
        setLoading(true);
        try {
            const response = await api.get("/ticket", {
                params: {
                    offset : pagination.offset , limit : pagination.limit , 
                    status : faq ?  tickets_status_enum.faq : undefined
                }
            });

            if (response && response.status == 200) {
                const { data } = response.data;

                if (pagination.offset != 0 )
                setTickets([
                    ...tickets,
                    ...data
                ]);
                else 
                   setTickets(data);     
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



    }, [tickets, pagination , faq])

  

    useEffect(() => { 
        fetch()
    }, [pagination]);


    return {
        tickets,
        loading,
        fetch,
        count

    }
}

export default useGetTickets; 