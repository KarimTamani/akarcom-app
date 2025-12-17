import { PropertyTag, PropertyType } from "@/lib/property";
import api from "@/services/api";
import axios from "axios";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface UseGetPropertyTypesResult {
    propertyTypes: PropertyType[];
    propertyTags: PropertyTag[];
    isLoading: boolean
}

const usePropertyQuery = (typesOnly: boolean = false): UseGetPropertyTypesResult => {
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [propertyTags, setPropertyTags] = useState<PropertyTag[]>([]);
    const [currentLocale, setCurrentLocale] = useState<string | undefined>(undefined);
    const locale = useLocale()

     
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {

                let requests: any[] = [api.get("property/property_type")];
                if (!typesOnly) {
                    requests.push(api.get("property/property_tags"))
                }

                const [typesResponse, tagsResponse] = await Promise.all(requests)

                if (typesResponse && typesResponse.status == 200) {
                    const { data } = typesResponse.data;
                    setPropertyTypes(data);
                }


                if (!typesOnly && tagsResponse && tagsResponse.status == 200) {
                    const { data } = tagsResponse.data;
                    setPropertyTags(data);
                }
            } catch (error) {

                if (axios.isAxiosError(error)) {
                    console.error(error);
                }

            } finally {
                setIsLoading(false)
            }
        })()
    }, []);

    useEffect(() => {
        if (isLoading)
            return;
        if (locale == "en")
            return;
        setPropertyTypes(propertyTypes.map((type: PropertyType) => ({
            ...type,
            name: locale == "ar" ? type.name_ar : type.name_fr,
            other_property_types: type.other_property_types.map((childType: PropertyType) => ({
                ...childType,
                name: locale == "ar" ? childType.name_ar : childType.name_fr,

            }))
        }))) 
    }, [isLoading, locale])


    return {
        propertyTypes,
        propertyTags,
        isLoading
    }


}


export default usePropertyQuery; 