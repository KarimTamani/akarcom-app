"use client"
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";
import Filter from "../componenets/layout/filter";
import AdvancedFilters from "./components/advanced-filters";
import useSearchProperty, { SearchPropertyFilter } from "../hooks/use-search-property";
import { useGeoLocation } from "@/hooks/use-get-location";
import { useEffect, useMemo, useState } from "react";
import { Property } from "@/lib/property";
import AdCard from "../componenets/ad-card";
import usePropertyQuery from "../dashboard/ads/hooks/use-get-property-types";
import { DataTablePagination } from "@/components/layout/table/data-table-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import ListPagination from "@/components/layout/list-pagination";
import { PaginationState } from "@tanstack/react-table";
import { PropertySkeletonCard } from "../componenets/property-skeleton-card";






const SearchPage: React.FC = ({ }) => {

    const t = useTranslations("search")
    const { location, isLoading: isLoadingLocation, error, refreshLocation } = useGeoLocation();
    const [filters, setFilters] = useState<SearchPropertyFilter | undefined>(undefined);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20
    })

    const router = useRouter();

    const searchParams = useSearchParams();
    // Convert to a plain object
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    useEffect(() => {
        if (isLoadingLocation)
            return;

        if (location) {
            setFilters({ sort_by: "distance", latitude: location[0], longitude: location[1], ...params })
            return;
        }
        if (error)
            setFilters({ sort_by: "created_at", ...params })

    }, [location, isLoadingLocation, error, params]);

    const { properties, isLoading : isLoadingPorprties, pageCount } = useSearchProperty(filters);

    const { propertyTypes, isLoading: isFetchingTypes } = usePropertyQuery(false);


    const onFilterChange = (values: SearchPropertyFilter) => {

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

        if (values.max_area)
            params.append("max_area", String(values.max_area));

        if (values.num_rooms)
            params.append("num_rooms", String(values.num_rooms));


        if (values.bethrooms)
            params.append("bethrooms", String(values.bethrooms));

        if (values.furnished)
            params.append("furnished", String(values.furnished));

        if (values.ownership_book)
            params.append("ownership_book", String(values.ownership_book));

        if (values.offset)
            params.append("offset", String(values.offset));

        if (values.limit)
            params.append("limit", String(values.limit));



        router.push(`/search?${params.toString()}`);
    }


    const onPaginationChange = (value: PaginationState) => {
        const offset = value.pageIndex * value.pageSize;
        const limit = value.pageSize;

    
        onFilterChange({
            ...filters , 
            offset  , 
            limit 
        })  ; 
        setPagination( value )
    }
    

    const isLoading = !(isLoadingLocation || isLoadingPorprties || isFetchingTypes)

    return (
        <MaxWidthWrapper className="pt-20 ">
            <div className="h-full flex  flex-col  gap-2  " >
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 '>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>{t("title")} </h2>
                        <p className='text-muted-foreground'>
                            {t("description")}
                        </p>
                    </div>
                </div>
                <Filter
                    typeSelection={true}
                    className="shadow-none"
                    value={filters}
                    onValueChange={onFilterChange}
                />
                <div className="w-full flex mt-4 gap-4 ">
                    <div className="hidden md:flex w-[360px] max-w-[360px] min-w-[360px] shrink-0  sticky top-0 flex flex-col">
                        <AdvancedFilters
                            location={location as number[]}
                            properties={properties}
                            onChange={onFilterChange}
                            value={filters}
                        />
                    </div>
                    <div className="w-full max-w-full overflow-hidden ">
                        {
                            isLoading ? properties.map((property: Property) => (
                                <div
                                    key={property.id}
                                >
                                    <AdCard property={property} orientation="horizontal" propertyTypes={propertyTypes} />
                                </div>
                            ))
                                 : (Array.from({ length: 10 }, (_, i) => <PropertySkeletonCard/>)) 

                        }

                        <ListPagination
                            pageCount={pageCount}
                            pagination={pagination}
                            setPagination={onPaginationChange}
                        />
                    </div>
                </div>
            </div>

        </MaxWidthWrapper>
    )
}


export default SearchPage;




