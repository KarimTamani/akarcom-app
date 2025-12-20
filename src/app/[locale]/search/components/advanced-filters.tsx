"use client"
import { useGeoLocation } from "@/hooks/use-get-location";
import PropertiesMap from "../../componenets/layout/properties-map";
import useSearchProperty, { SearchPropertyFilter } from "../../hooks/use-search-property";
import { useCallback, useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyTags from "../../dashboard/ads/create/components/property-tags";
import { Property, PropertyTag } from "@/lib/property";
import axios from "axios";
import api from "@/services/api";
import { useRouter } from "next/navigation";


interface AdvancedFiltersProps {
    location?: number[];
    refreshLocation?: () => void;
    properties?: Property[];
    onChange?: (filters: SearchPropertyFilter) => void,
    value?: SearchPropertyFilter

}


const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ refreshLocation, location, properties = [], onChange, value }) => {

    const [filters, setFilters] = useState<SearchPropertyFilter>({
        max_area: undefined,
        num_rooms: undefined,
        bethrooms: undefined,
        furnished: undefined,
        ownership_book: undefined
    })
    const t = useTranslations("ads.create")

    useEffect(() => {

        setFilters({
            ...value,
            max_area: value?.max_area,
            num_rooms: value?.num_rooms,
            bethrooms: value?.bethrooms,
            ownership_book: Boolean(value?.ownership_book),
            furnished: Boolean(value?.furnished),

        })
    }, [value])


    const [areaRange, setAreaRange] = useState<{ min_area: number | undefined, max_area: number | undefined } | undefined>(undefined);
    const [area, setArea] = useState<number>()

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        (async () => {

            try {
                setIsLoading(true);
                const response = await api.get("property/area")
                if (response && response.status == 200) {
                    const { data } = response.data;

                    setAreaRange(data)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("error : ", error)
                }
                setError(true)
            } finally {
                setIsLoading(false)
            }
        })()

    }, [])

    const router = useRouter();

    const onMarkerClick = useCallback((property: Property) => {

        router.push(`/property/${property.slug}`)
    }, []);


    useEffect(() => {
        onChange && onChange(filters)

    }, [filters]);

    useEffect(() => {

        if (value?.max_area) {
            setArea(value?.max_area)
            return;
        }
        if (areaRange?.max_area) {
            setArea(areaRange?.max_area)
        }
    }, [areaRange?.max_area, value?.max_area])


 


    return (
        <div className=" flex flex-col gap-4 sticky top-16">

            <PropertiesMap
                properties={properties}
                location={location as number[] | undefined}
                getGeoLocation={refreshLocation}
                height="300px"
                className="rounded-md overflow-hidden border-2 border-background ring-1 ring-border "
                onClick={onMarkerClick}

            />
            {
                !isLoading && !error && areaRange &&
                <div className="w-full space-y-2">
                    <Label>
                        {t("area")} {area}
                    </Label>
                    <Slider
                        defaultValue={[areaRange.max_area as number]}
                        max={areaRange.max_area}
                        min={areaRange.min_area}
                        step={10}
                        className={"w-full mt-4"}
                        value={[area as number]}
                        onValueChange={(value: number[]) => {
                            setArea(value[0])
                        }}

                        onBlur={() => {
                            setFilters({
                                ...filters,
                                max_area: area
                            })
                        }}
                    />
                </div>
            }
            <div className="w-full space-y-2">
                <Label>
                    {t("num_rooms")}
                </Label>
                <ToggleGroup type="single" variant="outline" size="sm" className="flex flex-wrap !shadow-none"
                    value={filters.num_rooms ? String(filters.num_rooms) : undefined}
                    onValueChange={(value: string) => {
                        setFilters({
                            ...filters,
                            num_rooms: Number(value)
                        })
                    }}
                >
                    {
                        Array.from({ length: 8 }, (_, i) => (
                            <ToggleGroupItem
                                key={i}
                                value={String(i + 1)}
                                aria-label="Toggle Rooms"
                                className="m-1 ml-0 !border-1 p-2 px-4 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-white"

                            >
                                {i + 1 == 8 ? "+8" : i + 1}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
            </div>
            <div className="w-full space-y-2">
                <Label>
                    {t("bethrooms")}
                </Label>
                <ToggleGroup type="single" variant="outline" size="sm" className="flex flex-wrap !shadow-none"
                    value={filters.bethrooms ? String(filters.bethrooms) : undefined}
                    onValueChange={(value: string) => {
                        setFilters({
                            ...filters,
                            bethrooms: Number(value)
                        })
                    }}
                >
                    {
                        Array.from({ length: 6 }, (_, i) => (
                            <ToggleGroupItem
                                key={i}
                                value={String(i + 1)}
                                aria-label="Toggle Rooms"
                                className="m-1 ml-0 !border-1 p-2 px-4 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-white"

                            >
                                {i + 1 == 6 ? "+6" : i + 1}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="furnished">{t("furnished")}</Label>
                <Checkbox id="furnished"
                    checked={filters.furnished}
                    onCheckedChange={(value: boolean) =>
                        setFilters({
                            ...filters,
                            furnished: value
                        })
                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="ownership_book">{t("ownership_book")}</Label>

                <Checkbox id="ownership_book"
                    checked={filters.ownership_book}
                    onCheckedChange={(value: boolean) =>
                        setFilters({
                            ...filters,
                            ownership_book: value
                        })
                    }
                />
            </div>

        </div>
    )
}

export default AdvancedFilters; 