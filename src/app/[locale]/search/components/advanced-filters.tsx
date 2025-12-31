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
import { Commune, Property, PropertyTag, Wilaya } from "@/lib/property";
import axios from "axios";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { Combobox } from "@/components/ui/combobox";
import { BookOpen, Droplet, Flame, Heater, Plug, School, Sofa, University } from "lucide-react";
import { cn } from "@/lib/utils";


interface AdvancedFiltersProps {
    location?: number[];
    wilayas?: Wilaya[];
    communes?: Commune[];
    refreshLocation?: () => void;
    properties?: Property[];
    onChange?: (filters: SearchPropertyFilter) => void,
    value?: SearchPropertyFilter
    loadingCommune?: boolean;
    forMap?: boolean
}


const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ refreshLocation, location, properties = [], onChange, value, wilayas = [], communes = [], loadingCommune = false, forMap = false }) => {

    const [filters, setFilters] = useState<SearchPropertyFilter>({
        max_area: undefined,
        min_area: undefined,
        num_rooms: undefined,
        bethrooms: undefined,
        furnished: undefined,
        ownership_book: undefined,
        wilaya_id: undefined,
        commune_id: undefined,
        water: undefined,
        electricity: undefined,
        gaz: undefined
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
            water: Boolean(value?.water),
            gaz: Boolean(value?.gaz),
            electricity: Boolean(value?.electricity),
            mosques: Boolean(value?.mosques),
            schools: Boolean(value?.schools),
        })
    }, [value])


    const [areaRange, setAreaRange] = useState<{ min_area: number | undefined, max_area: number | undefined } | undefined>(undefined);
    const [area, setArea] = useState<number[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        (async () => {

            try {
                setIsLoading(true);
                const response = await api.get("property/area")
                if (response && response.status == 200) {
                    const { data } = response.data;

                    setAreaRange(data);

                    setArea([data.min_area, data.max_area]);
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




    const [wilayaDefaultValue, setWialayaDefaultValue] = useState<Wilaya | undefined>(undefined);
    const [communeDefaultValue, setCommuneDefaultValue] = useState<Commune | undefined>(undefined);

    useEffect(() => {
        setWialayaDefaultValue(
            wilayas.find((wilaya: Wilaya) => wilaya.id == filters.wilaya_id)
        );

    }, [wilayas, filters.wilaya_id])


    useEffect(() => {

        setCommuneDefaultValue(
            communes.find((commune: Commune) => commune.id == filters.commune_id)
        );

    }, [communes, filters.commune_id])


    const updateFIlters = (values: SearchPropertyFilter) => {
        setFilters(values);
        onChange && onChange(values);
    }


    useEffect(() => {

    }, [value?.min_area, areaRange])


    useEffect(() => {


        if (value?.min_area && value.max_area) { 
            setArea([value.min_area , value.max_area])
            return ; 
        }

        if (value?.max_area) {
            setArea([area[0], value.max_area])
        }
        if (value?.min_area) {
            setArea([value.min_area, area[1]])
        }
    }, [value?.max_area, areaRange, value?.min_area])
    return (
        <div className={cn(" flex flex-col gap-4 sticky ", { "top-16": !forMap })}>
            {
                !forMap &&
                <PropertiesMap
                    properties={properties}
                    location={location as number[] | undefined}
                    getGeoLocation={refreshLocation}
                    height="300px"
                    className="rounded-md overflow-hidden border-2 border-background ring-1 ring-border "
                    onClick={onMarkerClick}

                />
            }

            <div className="w-full space-y-2">
                <Label>
                    {t("wilaya_id")}
                </Label>
                <Combobox
                    items={wilayas}
                    label="name"
                    placeholder={t("wilaya_placeholder")}
                    selectedItem={wilayaDefaultValue?.name}
                    className="bg-transparent hover:bg-transparent"
                    onSelectionChange={(name: string) => {

                        updateFIlters({
                            ...filters,
                            wilaya_id: wilayas.find((wilaya: Wilaya) => wilaya.name == name)?.id,
                            commune_id: undefined
                        })
                    }}

                />
            </div>
            <div className="w-full space-y-2">
                <Label>
                    {t("commune_id")}
                </Label>
                <Combobox
                    items={communes}
                    label="name"
                    placeholder={t("commune_placeholder")}
                    selectedItem={communeDefaultValue?.name}
                    
                    className="bg-transparent hover:bg-transparent"

                    onSelectionChange={(name: string) => {

                        updateFIlters({
                            ...filters,
                            commune_id: communes.find((commune: Commune) => commune.name == name)?.id
                        })
                    }}
                    isDisabled={!wilayaDefaultValue}
                    isLoading={wilayaDefaultValue && loadingCommune}
                />
            </div>


            {
                !isLoading && !error && areaRange &&
                <div className="w-full space-y-2">
                    <Label>
                        {t("area")} {area[0]} - {area[1]}
                    </Label>
                    <Slider

                        max={areaRange.max_area}
                        min={areaRange.min_area}

                        step={10}
                        className={"w-full mt-4"}
                        value={area}
                        onValueChange={(value: number[]) => {
                            setArea(value);
                        }}
                        onValueCommit={() => {
                            updateFIlters({
                                ...filters,
                                min_area: area[0],
                                max_area: area[1],
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
                        updateFIlters({
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
                        updateFIlters({
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
                <Label htmlFor="electricity"> <Plug className="size-4 text-muted-foreground" /> {t("electricity")}</Label>
                <Checkbox id="electricity"
                    checked={filters.electricity}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            electricity: value
                        })
                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="water"> <Droplet className="size-4 text-muted-foreground" /> {t("water")}</Label>
                <Checkbox id="water"
                    checked={filters.water}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            water: value
                        })
                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="gaz"> <Flame className="size-4 text-muted-foreground" /> {t("gaz")}</Label>
                <Checkbox id="gaz"
                    checked={filters.gaz}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            gaz: value
                        })

                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="furnished"> <Sofa className="size-4 text-muted-foreground" /> {t("furnished")}</Label>
                <Checkbox id="furnished"
                    checked={filters.furnished}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            furnished: value
                        })

                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="mosques"> <School className="size-4 text-muted-foreground" /> {t("mosques")}</Label>
                <Checkbox id="mosques"
                    checked={filters.mosques}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            mosques: value
                        })
                    }
                />
            </div>
            <div className="w-full flex justify-between ">
                <Label htmlFor="schools"> <University className="size-4 text-muted-foreground" /> {t("schools")}</Label>
                <Checkbox id="schools"
                    checked={filters.schools}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
                            ...filters,
                            schools: value
                        })
                    }
                />
            </div>

            <div className="w-full flex justify-between ">
                <Label htmlFor="ownership_book"> <BookOpen className="size-4 text-muted-foreground" />{t("ownership_book")}</Label>

                <Checkbox id="ownership_book"
                    checked={filters.ownership_book}
                    onCheckedChange={(value: boolean) =>
                        updateFIlters({
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