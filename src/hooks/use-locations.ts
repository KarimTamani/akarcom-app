import { Commune, Wilaya } from "@/lib/property"
import api from "@/services/api";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react"






const useLocations = (wilaya_id?: number) => {
    const [allWilayas, setAllWilayas] = useState<Wilaya[]>([])

    const [wilayas, setWilayas] = useState<Wilaya[]>([])
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [  loadingCommune , setLoadingCommune] = useState<boolean> ( false) ; 

    const locale = useLocale();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/location/wilaya');
                if (response && response.status == 200) {
                    const { data } = response.data;
                    setAllWilayas(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        })()
    }, []);


    useEffect(() => {
        if (locale != "ar")
            setWilayas(allWilayas)
        else
            setWilayas(allWilayas.map((wilaya: Wilaya) => (
                {...wilaya , name : wilaya.name_ar}
            )))
    }, [allWilayas]) ; 


    useEffect(() => {
        if ( ! wilaya_id) 
            return ; 
        (async () => { 
            setLoadingCommune(true) ; 
            try { 
                const response = await api.get('/location/commune/' + wilaya_id ) ; 
                if (response && response.status) { 
                    const { data } = response.data ; 
                    setCommunes(data) ; 
                }
            }catch(error) { 
                console.log (error) ; 
            }finally {
                setLoadingCommune(false)
            }

        })()

    } , [wilaya_id])

    return {
        wilayas,
        communes,
        isLoading , 
        loadingCommune 
    }
}


export default useLocations; 