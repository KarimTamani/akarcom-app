import { Property, PropertyStatus } from "@/lib/property"
import { UserType } from "@/lib/user";
import { useAuth } from "@/providers/auth-provider";
import api from "@/services/api";
import { PaginationState } from "@tanstack/react-table"
import axios from "axios";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"



export interface PropertyFetchFilters {
    status?: PropertyStatus | "all",
    query?: string;
}

const useFetchProperties = (pagination?: PaginationState, filters?: PropertyFetchFilters, favorite: boolean = false): {
    properties: Property[],
    isLoading: boolean,
    fetch: () => Promise<void>,
    setProperties: Dispatch<SetStateAction<Property[]>>,
    pageCount: number | undefined
} => {

    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number | undefined>(undefined);

    const { user } = useAuth();


    const fetch = useCallback(async () => {

        if (!pagination)
            return;

        setIsLoading(true);
        const offset = pagination.pageIndex * pagination.pageSize;
        const limit = pagination.pageSize;
        try {
            let user_id: number | undefined;
            if (user?.user_type != UserType.admin && user?.user_type != UserType.employee) {
                user_id = user?.id;
            }

            const response = await api.get("/property", {
                params: {
                    offset, limit,
                    query: filters?.query,
                    status: filters?.status == "all" ? undefined : filters?.status,
                    user_id,
                    favorite
                }
            });
            if (response && response.data) {
                const { data } = response.data;
                setPageCount(Math.ceil(response.data.count / limit))
                setProperties(data)
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {

            }
        } finally {
            setIsLoading(false);
        }
    }, [pagination, filters, user])

    useEffect(() => {

        fetch()

    }, [pagination, filters])


    return {
        properties, isLoading, fetch, setProperties,
        pageCount
    }
}


export default useFetchProperties;  