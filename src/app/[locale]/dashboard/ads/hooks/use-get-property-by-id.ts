import { Property } from "@/lib/property";
import api from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react"





const useGetPropertyById = (id: number | undefined) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [property, setProperty] = useState<Property | undefined>(undefined);
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        if (!id) {
            setProperty(undefined);
            return;
        }
        setNotFound(false);
        setIsFetching(true);

        (async () => {
            try {
                const response = await api.get("property/" + id);

                if (response && response.status == 200) {
                    const { data } = response.data;
                    setProperty(data);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error);
                }
            } finally {
                setIsFetching(false);
            }
        })()
    }, [id]);


    return {
        property,
        isFetching,
        notFound
    }
}

export default useGetPropertyById; 