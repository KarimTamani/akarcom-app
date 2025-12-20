import { Property } from "@/lib/property";
import { User } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react"





const useGetUserById = (id: number | undefined) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        if (!id)
            return;

        setNotFound(false);
        setIsFetching(true);

        (async () => {
            try {
                const response = await api.get("users/" + id);
 
                if (response && response.status == 200)  { 
                    const { data } = response.data ; 
                    setUser(data) ; 
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log (error) ; 
                }
            }finally { 
                setIsFetching(false) ; 
            }
        })()
    }, [id]) ; 


    return { 
        user , 
        isFetching , 
        notFound 
    }
}

export default useGetUserById ; 