import { Property, PropertyType, PropertyView } from "@/lib/property"
import api from "@/services/api";
import { toLocalISODate } from "@/utils/analytics";
import axios from "axios";
import { useEffect, useState } from "react"




export interface GeneralStat {

    user_count: number,
    previous_user_count: number,
    current_properties: Property[],
    previous_properties: Property[]
    current_subscriptions: any,
    previous_subscriptions: any,
    currnet_views: PropertyView[];
    previous_views: PropertyView[]
}


const useGetGeneralStats = (startDate?: Date, endDate?: Date) => {

    const [stats, setStats] = useState<GeneralStat | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (!startDate || !endDate)
            return;
        (async () => {

            setLoading(true);
            try {


                const response = await api.get("/analytics/general", {
                    params: {
                        start_date: toLocalISODate(startDate),
                        end_date: toLocalISODate(endDate)
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
    }, [startDate, endDate]);


    return {
        loading, stats
    }
}


export default useGetGeneralStats;


