import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: 0.0,
      lng: 0.0,
    },
    error: {
      code: 0,
      message: "",
    },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 1,
        message: "User Denied Geolocation!",
      });
    }

    // ? requesting for the location
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [location]);

  return location;
};

export default useGeoLocation;
