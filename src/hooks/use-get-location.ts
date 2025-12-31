import { useEffect, useState, useCallback } from "react";

export function useGeoLocation(autoFetch = true) {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          setLocation(coords);
          setIsLoading(false);
          res(coords)
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    })

  }, []);

  // auto fetch when component mounts
  useEffect(() => {
    if (autoFetch) fetchLocation();
  }, [autoFetch, fetchLocation]);

  return {
    location,
    isLoading,
    error,
    refreshLocation: fetchLocation,
  };
}
