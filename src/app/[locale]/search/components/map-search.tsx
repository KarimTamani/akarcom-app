
"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Commune, Property, Wilaya } from "@/lib/property"
import PropertiesMap from "../../componenets/layout/properties-map";
import { useRouter } from "@/i18n/navigation";
import { useCallback, useState } from "react";
import AdvancedFilters from "./advanced-filters";
import { SearchPropertyFilter } from "../../hooks/use-search-property";
import Filter from "../../componenets/layout/filter";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Funnel } from "lucide-react";

interface Props {
    properties?: Property[];
    open: boolean;
    onOpenChange: (value: boolean) => void;
    location: [number, number]
    refreshLocation?: () => void;

    wilayas?: Wilaya[];
    communes?: Commune[];
    onChange?: (filters: SearchPropertyFilter) => void,
    value?: SearchPropertyFilter
    loadingCommune?: boolean
    loading?: boolean


}






const MapSearch: React.FC<Props> = ({ properties = [], open, onOpenChange, location, refreshLocation, wilayas, communes, loadingCommune, value, onChange, loading = false }) => {

    console.log(value)
    const [filters, setFilters] = useState<SearchPropertyFilter>(value as SearchPropertyFilter);
    const router = useRouter();

    const t = useTranslations("search")
    const onMarkerClick = useCallback((property: Property) => {
        router.push(`/property/${property.slug}`)
    }, []);


    const onFilterChange = (changes: SearchPropertyFilter) => {

        setFilters({
            ...filters,
            ...changes
        })
    }

    const search = () => {
        onChange && onChange(filters);
    }

    const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
    const isMobile = useIsMobile()
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="min-w-full h-full w-full  p-0 ">
                <div className="relative flex flex-col w-full h-full">
                    <PropertiesMap
                        properties={properties}
                        location={location as number[] | undefined}
                        getGeoLocation={refreshLocation}
                        height="full"
                        className="rounded-md overflow-hidden min-h-full col-span-2 "
                        onClick={onMarkerClick}
                    />
                    {
                        (!isMobile || showMobileFilter) &&
                        <div className="absolute right-0 p-4 w-full md:w-[460px] h-full pt-12">
                            <div className="h-full w-full rounded-md backdrop-blur-sm bg-background/20  border-1 shadow-sm flex flex-col">
                                {
                                    isMobile && 
                                    <div className="p-2">
                                        <Button
                                            size={"icon"}
                                            variant={"ghost"}
                                            onClick={() => setShowMobileFilter(false)}
                                        >
                                            <ArrowLeft />
                                        </Button>
                                    </div>
                                }
                                <MapFilter
                                    location={location as any}
                                    properties={properties}
                                    onChange={onFilterChange}
                                    value={value}
                                    refreshLocation={refreshLocation}
                                    wilayas={wilayas}
                                    communes={communes}
                                    loadingCommune={loadingCommune}
                                />
                                <div className="p-2 pt-4 w-full">
                                    <Button className="w-full" onClick={search} disabled={loading}>
                                        {t("search")}
                                        {loading ? <Spinner /> : undefined}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !showMobileFilter && isMobile && 
                        <Button
                            size={"icon"}
                            className="absolute bottom-4 left-4"
                            onClick={() => {
                                setShowMobileFilter(!showMobileFilter)
                            }}
                        >
                            <Funnel />
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MapSearch;

interface MapFilterProps {
    properties?: Property[];
    location: [number, number]
    refreshLocation?: () => void;
    wilayas?: Wilaya[];
    communes?: Commune[];
    onChange?: (filters: SearchPropertyFilter) => void,
    value?: SearchPropertyFilter
    loadingCommune?: boolean

}


const MapFilter: React.FC<MapFilterProps> = ({ properties = [], location, refreshLocation, wilayas, communes, loadingCommune, value, onChange }) => {

    const onFilterChange = (changes: SearchPropertyFilter) => {
        onChange && onChange({
            ...value,
            ...changes
        })
    }


    return (
        <div className="overflow-auto h-full p-2">
            <Filter
                typeSelection={true}
                className="shadow-none flex-col "
                value={value}
                onValueChange={onFilterChange}
                forMap
            />
            <AdvancedFilters
                location={location as number[]}
                properties={properties}
                onChange={onFilterChange}
                value={value}
                refreshLocation={refreshLocation}
                wilayas={wilayas}
                communes={communes}
                loadingCommune={loadingCommune}
                forMap
            />
        </div>
    )
}