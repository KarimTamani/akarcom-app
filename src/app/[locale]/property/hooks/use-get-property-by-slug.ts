import { Property } from "@/lib/property"
import api from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react"





const useGetPropertyBySlug = (slug: string) => {

    const [property, setProperty] = useState<Property | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean | undefined>(undefined);


    useEffect(() => {
        setNotFound(undefined);
        setLoading(true);
        (async () => {
            try {
                const response = await api.get('/property/slug/' + slug ) ; 
                if (response && response.status == 200 ) { 
                    const {data } = response.data ; 
                    setProperty(data) ; 
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error);
                    if (error && error.status == 404) {
                        setNotFound(true);
                    }
                }
            }finally {
                setLoading(false) ; 
            }
        })()

    }, [slug])

    return {
        property , 
        loading , 
        notFound , 
    }
}

export default useGetPropertyBySlug ; 