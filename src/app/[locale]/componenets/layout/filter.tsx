"use client"
import AddressAutoComplete, { Location } from "@/components/address-autocomplete";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocale, useTranslations } from "next-intl";
import usePropertyQuery from "../../dashboard/ads/hooks/use-get-property-types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyType } from "@/lib/property";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import PriceRange from "../price-range";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SearchPropertyFilter } from "../../hooks/use-search-property";



interface Props {
    typeSelection?: boolean;
    className?: string;
    value?: SearchPropertyFilter,
    onValueChange?: (value: SearchPropertyFilter) => void;
}


const toggleClass: string = "!max-w-24 w-24 !rounded-none border-none hover:!bg-accent/20 focus:!bg-background/20 bg-foreground/10 dark:bg-background/10 data-[state=on]:!bg-background/20 font-medium"

const Filter: React.FC<Props> = ({ typeSelection = false, className, value, onValueChange }) => {

    const { propertyTypes, isLoading: isFetchingTypes } = usePropertyQuery(true);

    const [filters, setFilters] = useState<SearchPropertyFilter>({
        property_type_ids: undefined,
        latitude: undefined,
        longitude: undefined,
        ad_type: "all",
        start_price: undefined,
        end_price: undefined
    })

    useEffect(() => {

        setFilters({
            ...value,
            property_type_ids: (!value?.property_type_ids || value?.property_type_ids == "all") ? "all" : Number(value?.property_type_ids),
            latitude: value?.latitude,
            longitude: value?.longitude,
            ad_type: value?.ad_type ?? "all",
            start_price: value?.start_price,
            end_price: value?.end_price,
        })
    }, [value])
    const t = useTranslations("home.filter");

    const search = () => {
        onValueChange && onValueChange(filters);
    }
    const locale = useLocale();

    return (
        <div className={cn("flex flex-col shadow-lg  rounded-md", className)}>
            {
                !typeSelection &&
                <ToggleGroup type="single" variant="outline" defaultValue="all" size="sm" className="backdrop-blur-sm  rounded-none !rounded-t-md overflow-hidden flex rtl:flex-row-reverse"
                    value={filters.ad_type}
                    onValueChange={(value: "all" | "sale" | "rent") => {
                        setFilters({
                            ...filters,
                            ad_type: value
                        })
                    }}
                >
                    <ToggleGroupItem
                        value="all"
                        aria-label="Toggle All"
                        className={toggleClass}
                    >
                        {t("all")}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="sale"
                        aria-label="Toggle sale"
                        className={toggleClass}
                    >
                        {t("sale")}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="rent"
                        aria-label="Toggle rent"
                        className={toggleClass}
                    >
                        {t("rent")}
                    </ToggleGroupItem>
                </ToggleGroup>
            }
            <div className={cn("flex  w-full backdrop-blur-sm bg-background/20  rounded-b-md gap-4 justify-center", !typeSelection && "p-4")}>
                <div className="flex-1 overflow-hidden space-y-2">
                    <Label>
                        {t("location")}
                    </Label>
                    <AddressAutoComplete
                        onChange={(location: Location | undefined) => {
                            if (location)
                                setFilters({
                                    ...filters,
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                })
                            else
                                setFilters({
                                    ...filters,
                                    latitude: undefined,
                                    longitude: undefined
                                })

                        }}
                    />
                </div>

                <div className="flex-1 overflow-hidden space-y-2">
                    <Label>
                        {t("property_type")}
                    </Label>
                    <Select
                        value={filters?.property_type_ids ? String(filters?.property_type_ids) : undefined}
                        dir={locale == "ar" ? "rtl" : "ltr"}
                        onValueChange={(id: string) => {
                            setFilters({
                                ...value,
                                property_type_ids: id == "all" ? "all" : Number(id)
                            })
                        }}
                    >
                        <SelectTrigger className="w-full ">
                            <SelectValue placeholder={t("property_type_placeholder")} />
                        </SelectTrigger>
                        <SelectContent >

                            <SelectItem key={"all"} value={"all"}  >
                                {t("all")}

                            </SelectItem>
                            {
                                propertyTypes.map((propertyType: PropertyType) => (
                                    <SelectGroup key={propertyType.id}>
                                        <SelectLabel>{propertyType.name}</SelectLabel>
                                        {
                                            propertyType.other_property_types.map((childType: PropertyType) => (
                                                <SelectItem key={childType.id} value={String(childType.id)}>{childType.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                {
                    typeSelection &&
                    <div className="flex-1 overflow-hidden space-y-2">
                        <Label>
                            {t("operation_type")}
                        </Label>
                        <Select
                            defaultValue="all"
                            value={filters.ad_type}
                                dir={locale == "ar" ? "rtl" : "ltr"}
                            onValueChange={(value: "all" | "sale" | "rent") => {
                                setFilters({
                                    ...filters,
                                    ad_type: value
                                })
                            }}
                        >
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={t("operation_type")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={"all"} value="all">{t("all")}</SelectItem>
                                <SelectItem key={"sale"} value="sale">{t("sale")}</SelectItem>
                                <SelectItem key={"rent"} value="rent">{t("rent")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                }
                <div className="flex-1 overflow-hidden space-y-2">
                    <Label>
                        {t("price")}
                    </Label>
                    <PriceRange
                        minPrice={filters.start_price}
                        maxPrice={filters.end_price}
                        onChange={(min: number | undefined, max: number | undefined) => {
                            setFilters({
                                ...filters,
                                start_price: min,
                                end_price: max
                            })
                        }}
                    />
                </div>
                <div className="shrink-0 flex items-end">
                    <Button
                        size={"icon"}
                        onClick={search}
                    >
                        <Search />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Filter; 