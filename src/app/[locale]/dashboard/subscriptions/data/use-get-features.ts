import { SubscriptionFeatures } from "@/lib/subscriptions";
import { useTranslations } from "next-intl"
import { useMemo } from "react"





const useGetFeatures = () => {
    
    const t = useTranslations("subscriptions.features") ; 
    

    return useMemo(() => { 


        return Object.values(SubscriptionFeatures).map( ( value : string ) => ({
            id : value , 
            label : t(value)
        }))


        

    } , [t])
}


export default useGetFeatures ; 