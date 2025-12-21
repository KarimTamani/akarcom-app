"use client"
import { useCallback, useEffect, useState } from "react";
import { Combobox } from "./ui/combobox";
import { geopify } from "@/services/geoapify";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";


export interface Location {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    postal_code: string;
}



interface Props {
    onChange?: (location: Location | undefined) => void;
}

const AddressAutoComplete: React.FC<Props> = ({ onChange }) => {

    const [query, setQuery] = useState<string>("");

    const searchQuery = useDebounce(query)

    const [locations, setLocations] = useState<Location[]>([])

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (searchQuery.trim().length == 0)
            return;
        (async () => {
            setLoading(true) ; 
            const response: any = await geopify(searchQuery)
            if (response?.features) {
                setLocations(response.features.map((feature: any) => {

                    const address: string = feature.properties.formatted + (feature.properties.postcode ? (" " + `(${feature.properties.postcode})`) : "")
                    return {
                        id: address,
                        address,
                        latitude: feature.properties.lat,
                        longitude: feature.properties.lon,
                        city: feature.properties.city,
                        postal_code: feature.properties.postcode
                    } as Location
                }))
            }
            setLoading(false) ; 
        })()
    }, [searchQuery])

    const onSelectionChange = (address: string) => {

        const location: Location | undefined = locations.find((location: Location) => location.id == address);
        onChange && onChange(location)
    }

    const t = useTranslations("components.location_picker")
    return (
        <div className="relative ">
            <Combobox
                items={locations}
                onQueryChange={setQuery}
                label="address"
                placeholder={t("placeholder")}
                onSelectionChange={onSelectionChange}
                className="overflow-hidden bg-transparent hover:bg-transparent "
                isLoading={loading}
            >

            </Combobox>
        </div>
    )
}

export default AddressAutoComplete; 