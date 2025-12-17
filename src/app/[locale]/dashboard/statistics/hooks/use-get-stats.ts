import {  PropertyType } from "@/lib/property"
import api from "@/services/api";
import { toLocalISODate } from "@/utils/analytics";
import axios from "axios";
import { useEffect, useState } from "react"


export interface Stats {
    pending_properties: number,
    pending_messages: number,
    previous_pending: number,
    previous_messages: number,
    new_properties?: {count : number , property_type_id : number , percentage : number  , type : PropertyType }[]
}




const useGetStats = (startDate: Date, endDate: Date) => {

    const [stats, setStats] = useState<Stats | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {

            setLoading(true);
            try {   
 

                const response = await api.get("/analytics", {
                    params: {
                        start_date: toLocalISODate(startDate),
                        end_date: toLocalISODate( endDate)
                    }
                });


                if (response && response.status == 200) {
                    const { data } = response.data;
                    setStats(data);
                }

            } catch (error) {
                if (axios.isAxiosError(error))
                    console.error(error);
            }
            finally {
                setLoading(false);
            }
        })()
    }, [startDate, endDate]) ; 


    return { 
        loading , stats  
    }
}


export default useGetStats ; 


