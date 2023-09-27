import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import useGeoLocation from "@/hooks/useGeoLocation";
import sites from "@/data";
import Link from "next/link";
import Image from "next/image";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function MapBox() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedSite, setSelectedSite] = useState(null);
  const [city, setCity] = useState(""); // ?  this is for the search field
  const [center, setCenter] = useState(null);

  const capitalizeWords = (string) => {
    const words = string.split(" ");

    const capitalizedWords = words.map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    const resultString = capitalizedWords.join(" ");

    return resultString;
  };

  const location = useGeoLocation();
  useEffect(() => {
    if (location)
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
  }, [location]);

  // ? city searching function
  const searchCity = async () => {
    const geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city + ",India"
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geoCodeUrl);
    const geocodeData = await geocodeResponse.json();
    console.log(geocodeData);
    const { lat, lng } = geocodeData.results[0].geometry.location;
    setCenter({ lat, lng });
  };

  return isLoaded ? (
    <div className="flex flex-col items-start gap-3 mt-5">
      <div className="flex flex-col items-start gap-3 px-4">
        <span className="font-semibold text-xl">Search by city</span>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-1 pl-2 border-blue-700 border-[2px] rounded-2xl"
            placeholder="Enter city name..."
          />
          <button
            onClick={searchCity}
            className="text-white active:scale-110 transition transform duration-300 bg-blue-500 p-1 px-4 rounded-2xl font-semibold"
          >
            Search
          </button>
        </div>
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={{ lat: site.lat, lng: site.lng }}
            onClick={() => {
              site === selectedSite
                ? setSelectedSite(undefined)
                : setSelectedSite(site);
            }}
          />
        ))}

        {selectedSite && (
          <InfoWindowF
            position={{ lat: selectedSite.lat, lng: selectedSite.lng }}
          >
            <div className="flex flex-col gap-3 m-2">
              <span className="text-black font-semibold text-lg">
                {capitalizeWords(selectedSite.name)}
              </span>
              <span>Parking Slots: {selectedSite.parkingSlots}</span>
              <Link href={selectedSite.gMapLink} target="_blank">
                <div className="flex gap-2 items-end">
                  <Image src={"/assets/gmaps.png"} width={20} height={20} />
                  <span className="underline text-blue-500 font-semibold">
                    On Google Maps
                  </span>
                </div>
              </Link>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  ) : null;
}

export default React.memo(MapBox);
