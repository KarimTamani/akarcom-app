
// components/Map.tsx
"use client"; // if using app directory
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useMapEvents } from "react-leaflet";

function ClickHandler({ onClick }: { onClick: (latlng: [number, number]) => void }) {
    useMapEvents({
        click(e) {
            const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
            onClick(latlng);
        },
    });
    return null;
}
// Custom default icon
const DefaultIcon = L.icon({
    iconUrl: markerIconUrl as any,
    shadowUrl: markerShadowUrl as any,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


interface MapProps {
    coordinates?: {
        latitude: number,
        longitude: number,
    },
    defaultZoom?: number,
    onChange: (location: number[]) => void
}



const ALGERIA_LOCATION = [28.0339, 1.6596]

const Map: React.FC<MapProps> = ({ coordinates, defaultZoom = 5, onChange }) => {

    const [location, setLocation] = useState<number[]>(coordinates ? [coordinates.latitude, coordinates.latitude] : ALGERIA_LOCATION);
    const [zoom, setZoom] = useState<number>(defaultZoom);

    useEffect(() => {
        if (coordinates) {
            setLocation([coordinates.latitude, coordinates.longitude]);
            setZoom(200);
        }
    }, [coordinates]);

    useEffect(() => {
        if (coordinates) {
            return;
        }
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation: any = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];
                setLocation(currentLocation);

                onChange && onChange(currentLocation)
                setZoom(13);
            },
            (err) => {
                console.error(err.message);
            },
            {
                enableHighAccuracy: true, // More precise, uses GPS if available
                timeout: 10000,           // Timeout after 10s
                maximumAge: 0,            // Don’t use cached position
            }
        );
    }, []);

    return (
        <div className="relative border-1 rounded-lg overflow-hidden" style={{
            zIndex: 0
        }}>
            <MapContainer center={location} zoom={defaultZoom} style={{ height: "400px", width: "100%" }} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
                <Marker position={location}>
                    <Popup>
                        You are Here
                    </Popup>
                </Marker>
                <ClickHandler
                    onClick={(coords) => { 
                        onChange && onChange(coords)

                    }}
                />
                <RecenterAutomatically location={location} />
            </MapContainer>
        </div>
    );
}

// 🧭 This subcomponent re-centers the map when location changes
function RecenterAutomatically({
    location,

}: {
    location: number[];

}) {
    const map = useMap();
    const currentZoom = map.getZoom(); // keep existing zoom
    useEffect(() => {
        map.setView(location, currentZoom, {
            animate: true,
        });
    }, [location, map]);

    return null;
}


export default Map 