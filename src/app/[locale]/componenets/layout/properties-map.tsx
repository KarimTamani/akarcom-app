
// components/Map.tsx
"use client"; // if using app directory
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import L, { LatLngBoundsExpression, marker } from "leaflet";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useMapEvents } from "react-leaflet";
import { Property } from "@/lib/property";


// Custom default icon
const DefaultIcon = L.icon({
    iconUrl: markerIconUrl as any,
    shadowUrl: markerShadowUrl as any,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


interface MapProps {
    location?: number[],
    defaultZoom?: number,
    properties?: Property[],
    getGeoLocation?: () => void;
    height?: string | "full";
    className?: string;
    showMarker?: boolean;
    onClick?: (property: Property) => void,
}

const PropertiesMap: React.FC<MapProps> = ({ location, defaultZoom = 5, properties = [], getGeoLocation, className, height, onClick }) => {


    const [zoom, setZoom] = useState<number>(defaultZoom);

    const allMarkers = useMemo(() => {
        const markers = properties
            .filter((p) => p.latitude && p.longitude)
            .map((p) => ({
                latitude: p.latitude!,
                longitude: p.longitude!,
            }))

        if (location && location.length != 0) {
            markers.push({
                latitude: location[0],
                longitude: location[1],
            })
        }

        return markers;

    }, [location, properties]);


    return (
        <div className={cn("relative  overflow-hidden rounded-md ", className)} style={{
            zIndex: 0
        }}>
            <MapContainer center={location} zoom={defaultZoom} style={{ height:  height == "full" ? "100%" :  ( height || "660px"), width: "100%", position: "relative" }} className={cn("min-h-0 !relative "  )} zoomControl={false} >
                <CustomZoomControl getGeoLocation={getGeoLocation} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
                {
                    location &&
                    <Marker position={location}>


                    </Marker>
                }
                {
                    properties.filter((property: Property) => property.latitude && property.longitude).map((property: Property) => (
                        <PropertyMarker property={property} onClick={onClick as any } key={property.id} />
                    ))
                }
                <FitMarkers
                    markers={allMarkers}
                />

            </MapContainer>


        </div>
    );
}


interface PropertyMarkerProps {
    property: Property,
    onClick: (property: Property) => void
}


const PropertyMarker: React.FC<PropertyMarkerProps> = ({ property, onClick }) => {

    const customHtmlMarker = L.divIcon({
        html: `
            <div class="w-fit  rounded-md bg-white   shadow-lg text-white p-2 py-1 border-2 border-white relative !text-primary font-semibold">
            <p>    
            ${property.price}DA
            </p>    
            <div class="w-3 h-3 bg-background rotate-[45deg] absolute left-[50%] -translate-[50%] -bottom-3 bg-white">
                </div> 
            </div>
        `,
        className: "", // IMPORTANT: prevents default marker styles
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
    return (
        <Marker
            position={[property.latitude as number, property.longitude as number]}
            icon={customHtmlMarker}
            eventHandlers={{
                click: () => onClick(property),
            }}

        >

        </Marker>
    )
}

import { Plus, Minus, ZoomIn, ZoomOut, Navigation } from "lucide-react"; // example icons
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomZoomControl(props: any) {
    const map = useMap();

      const controlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!controlRef.current) return;

    // 🚫 Stop Leaflet from treating clicks as map clicks
    L.DomEvent.disableClickPropagation(controlRef.current);
    L.DomEvent.disableScrollPropagation(controlRef.current);
  }, []);

    return (
        <div  ref={controlRef} className="absolute top-[50%] -translate-y-[50%] left-4 flex flex-col  gap-2 rounded-lg  bg-transparent z-[99px] text-foreground dark:text-accent"
            style={{
                zIndex: 999
            }}
        >
            <Button
                onClick={(event : any) => {
                    event.preventDefault() 
                    map.zoomIn() 
                }}
                size={"icon"}
                variant={"outline"}
                type="button"
                className="backdrop-blur-sm bg-background/20 border-none hover:!bg-accent/20  shadow-md hover:text-primary"
            >
                <ZoomIn size={18} />
            </Button>
            <Button
                onClick={() => map.zoomOut()}
                size={"icon"}
                variant={"outline"}
                type="button"
                className="backdrop-blur-sm bg-background/20 border-none hover:!bg-accent/20 shadow-md hover:text-primary"
            >
                <ZoomOut size={18} />
            </Button>
            {
                props.getGeoLocation &&
                <Button
                    onClick={props.getGeoLocation}
                    size={"icon"}
                    variant={"outline"}
                    type="button"
                    className="backdrop-blur-sm bg-background/20 border-none hover:!bg-accent/20 shadow-md hover:text-primary"
                >
                    <Navigation size={18} />
                </Button>
            }
        </div>
    );
}

export interface MarkerPosition {
    latitude: number;
    longitude: number;
}

interface FitMarkersProps {
    markers: MarkerPosition[];
}

export const FitMarkers: React.FC<FitMarkersProps> = ({ markers }) => {
    const map = useMap();

    useEffect(() => {
        if (!markers || markers.length === 0) return;

        const bounds: LatLngBoundsExpression = markers.map((m) => [
            m.latitude,
            m.longitude,
        ]);


        map.fitBounds(bounds, {
            padding: [80, 80],
            animate: true,
        });
    }, [markers, map]);

    return null;
};




export default PropertiesMap 