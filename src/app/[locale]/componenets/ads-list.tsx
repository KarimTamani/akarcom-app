"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useSearchProperty, { SearchPropertyFilter } from "../hooks/use-search-property";
import React, { useEffect, useMemo, useState } from "react";
import { Property } from "@/lib/property";
import AdCard from "./ad-card";
import { useLocale } from "next-intl";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Spinner } from "@/components/ui/spinner";
import { useGeoLocation } from "@/hooks/use-get-location";


interface Props {
    defaultFilters?: SearchPropertyFilter
}


const filters: SearchPropertyFilter = {
    offset: 0,
    limit: 10
}
const AdsList: React.FC<Props> = ({ defaultFilters }) => {


    const { location, isLoading: loadingLocation } = useGeoLocation()

    const [searchableFilters, setSearchableFilters] = useState<SearchPropertyFilter | undefined>(undefined);



    useEffect(() => {

        if (defaultFilters && defaultFilters.sort_by == "created_at")
            setSearchableFilters({ ...filters, ...defaultFilters })



    }, [defaultFilters])

    useEffect(() => { 


        if (defaultFilters && defaultFilters.sort_by == "created_at")
            return;


        if (!loadingLocation && location && location?.length > 0) {
            setSearchableFilters({ ...filters, ...defaultFilters, latitude: location[0], longitude: location[0] })
        }
        else if (!loadingLocation && !location) {
            setSearchableFilters(filters)
        }



    }, [location, loadingLocation])


    const { properties, isLoading } = useSearchProperty(searchableFilters);
    const isMobile = useIsMobile();

    return (
        <Carousel className="w-full "
            opts={{
                align: "start",
            }}
            orientation={  "horizontal"}
            dir="ltr"
        >
            <CarouselContent className="-mt-1 h-[440px]">
                {
                    !isLoading ? properties.map((property: Property) => (
                        <CarouselItem className=" pt-1 md:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={property.id} > <AdCard property={property} /></CarouselItem>
                    )) :
                        (
                            <div className="w-full  flex items-center justify-center">
                                <Spinner className="w-12 h-12 text-primary" />
                            </div>
                        )
                }
            </CarouselContent >
            <CarouselPrevious className=" hidden lg:flex"/>
            <CarouselNext  className=" hidden lg:flex"/>
        </Carousel>
    )
}

export default AdsList; 