"use client"
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Filter from "./filter";
import PropertiesMap from "./properties-map";
import useSearchProperty, { SearchPropertyFilter } from "../../hooks/use-search-property";
import { useGeoLocation } from "@/hooks/use-get-location";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Property } from "@/lib/property";
import { useRouter } from "@/i18n/navigation";





const MainFilter: React.FC = ({ }) => {

    const { location, isLoading: isLoadingLocation, error, refreshLocation } = useGeoLocation();
    const [filters, setFilters] = useState<SearchPropertyFilter | undefined>(undefined);
    const router = useRouter() ; 

    useEffect(() => {
        if (isLoadingLocation)
            return;

        if (location) {
            setFilters({ sort_by: "distance", latitude: location[0], longitude: location[1] })
            return;
        }
        if (error)
            setFilters({ sort_by: "created_at" })

    }, [location, isLoadingLocation, error])

    const { properties, isLoading } = useSearchProperty(filters)

    const onMarkerClick = useCallback( (property : Property) => {
   
        router.push(`/property/${property.slug}`)
    } , []) ; 

    const search = useCallback((values : SearchPropertyFilter) => {
          const params = new URLSearchParams({});

        if (values.property_type_ids)
            params.append("property_type_ids", String(values.property_type_ids));

        if (values.ad_type)
            params.append("ad_type", String(values.ad_type));

        if (values.latitude)
            params.append("latitude", String(values.latitude));

        if (values.longitude)
            params.append("longitude", String(values.longitude));

        if (values.start_price)
            params.append("start_price", String(values.start_price));

        if (values.end_price)
            params.append("end_price", String(values.end_price));

    
        router.push(`/search?${params.toString()}`);
    } , [ ])
    
    return (
        <div className="relative max-h-[60vh] overflow-hidden lg:max-h-fit lg:overflow-visible ">
            {
                
                <PropertiesMap
                    properties={properties }
                    location={ location  as number[] | undefined}
                    getGeoLocation = { refreshLocation}
                    onClick={ onMarkerClick}
                 
                /> 
            }
            <div className="absolute w-full  bottom-16">
                <MaxWidthWrapper>
                    <Filter 
                        onValueChange = { search}
                    />
                </MaxWidthWrapper>
            </div>
        </div>
    )
}


export default MainFilter; 