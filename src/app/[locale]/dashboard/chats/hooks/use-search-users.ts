


 
import { User } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react"





const useSearchUsers = (query: string | undefined) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [users, setUsers] = useState<User[] >([]);
  
    useEffect(() => {
  
        setIsFetching(true);

        (async () => {
            try {
                const response = await api.get("users/" , { 
                    params : { 
                        query 
                    }
                });
 
                if (response && response.status == 200)  { 
                    const { data } = response.data ; 
                    setUsers(data) ; 
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log (error) ; 
                }
            }finally { 
                setIsFetching(false) ; 
            }
        })()
    }, [query]) ; 


    return { 
        users  , 
        isFetching , 
   
    }
}

export default useSearchUsers ; 