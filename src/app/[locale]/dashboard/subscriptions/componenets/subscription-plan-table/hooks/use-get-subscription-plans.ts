import { SubscriptionPlan } from "@/lib/subscriptions"
import api from "@/services/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"






const useGetSubscriptionPlans = () => {

    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const fetch = useCallback(async () => {
 

        setIsLoading(true);
 
        try {
 
            const response = await api.get("/subscription/subscription_plan" );
            
            if (response && response.data) {
                const { data } = response.data;
                setPlans(data) ; 
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {

            }
            console.log ( error) ; 
        } finally {
            setIsLoading(false);
        }
    }, []) ; 


    useEffect(() => { 
        fetch()  ;
    } , [])


    return {
        isLoading , plans , fetch , setPlans
    }
}

export default useGetSubscriptionPlans 