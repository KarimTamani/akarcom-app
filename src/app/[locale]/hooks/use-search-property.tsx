"use client"

import { useDebounce } from "@/hooks/use-debounce";
import { Property } from "@/lib/property";
import api from "@/services/api";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface SearchPropertyFilter {
    offset?: number;
    limit?: number;
    sort_by?: "distance" | "created_at",
    latitude?: number;
    longitude?: number;
    ad_type?: "all" | "sale" | "rent",
    start_price?: number;
    end_price?: number;
    property_type_ids?: number | "all";
    max_area?: number;
    min_area?: number;
    num_rooms?: number;
    bethrooms?: number;
    furnished?: boolean;
    ownership_book?: boolean;
    wilaya_id?: number;
    commune_id?: number;
    gaz?: boolean;
    water?: boolean;
    electricity?: boolean;
    mosques? : boolean ; 
    schools? : boolean ; 
    
}


export interface SearchPropertiesResult {
    properties: Property[],
    isLoading: boolean,
    error: boolean,
    fetch: () => Promise<void>,
    pageCount: number
}



const useSearchProperty = (searchFilters: SearchPropertyFilter | undefined): SearchPropertiesResult => {

    const [properties, setProperties] = useState<Property[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);

    const t = useTranslations("home");
    const filters = useDebounce(searchFilters, 500);
    const fetch = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await api.get("/property", {
                params: {
                    offset: filters?.offset,
                    limit: filters?.limit,
                    sort_by: filters?.sort_by,
                    latitude: filters?.latitude,
                    longitude: filters?.longitude,
                    status: "published",
                    ad_type: (filters?.ad_type == "all" || !filters?.ad_type) ? undefined : JSON.stringify([filters.ad_type as string]),
                    property_type_ids: (filters?.property_type_ids && filters?.property_type_ids != "all") ? JSON.stringify([Number(filters.property_type_ids)]) : undefined,
                    start_price: filters?.start_price,
                    end_price: filters?.end_price,
                    num_rooms: filters?.num_rooms,
                    bethrooms: filters?.bethrooms,
                    max_area: filters?.max_area,
                    min_area: filters?.min_area,
                    furnished: !filters?.furnished ? undefined : true,
                    ownership_book: !filters?.ownership_book ? undefined : true,
                    wilaya_id: filters?.wilaya_id,
                    commune_id: filters?.commune_id,
                    water: !filters?.water ? undefined : true,
                    gaz: !filters?.gaz ? undefined : true,
                    electricity: !filters?.electricity ? undefined : true,
                    
                    mosques: !filters?.mosques ? undefined : true,
                    schools: !filters?.schools ? undefined : true, 
                }
            });
            if (response && response.data) {
                const { data } = response.data;

                setPageCount(Math.ceil(response.data.count / (filters?.limit ?? 20)))
                setProperties(data)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(t("errors.failed_to_load.title"), {
                    description: t("errors.failed_to_load.description"),
                    className: "!text-destructive",
                    descriptionClassName: "!text-destructive"
                })
            }
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);


    useEffect(() => {
        if (!filters)
            return;
        fetch()
    }, [filters])

    return {
        properties,
        isLoading,
        error,
        fetch,
        pageCount
    } as SearchPropertiesResult
}


export default useSearchProperty; 