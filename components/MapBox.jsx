import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import useGeoLocation from "@/hooks/useGeoLocation";
// import sites from "@/data";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
// import Geocoder from "./Geocoder.js";
// import { Geocoder } from "./Geocoder";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function MapBox({ sites }) {
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

  const [searchLocate, setSearchLocate] = useState(false);
  const [drag, setDrag] = useState(false);
  const location = useGeoLocation();
  useEffect(() => {
    if (drag) return;
    if (searchLocate) return;
    if (location)
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
  }, [location]);

  const searchLocation = async () => {
    const geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=8b30eeeacfb94fcd8e9e423e6ee9633f`;
    const resp = await fetch(geoCodeUrl);
    const data = await resp.json();
    const result = data.results[0];
    const { lat, lng } = result.geometry;
    setCenter({
      lat,
      lng,
    });
    setSearchLocate(true);
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
            onClick={searchLocation}
            className="text-white active:scale-110 transition transform duration-300 bg-blue-500 p-1 px-4 rounded-2xl font-semibold"
          >
            Search
          </button>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onDrag={() => setDrag(true)}
      >
        {sites?.map((site) => (
          <MarkerF
            key={site.id}
            position={{
              lat: site.location.latitude,
              lng: site.location.longitude,
            }}
            onClick={() => {
              site === selectedSite
                ? setSelectedSite(undefined)
                : setSelectedSite(site);
            }}
          />
        ))}

        {selectedSite && (
          <InfoWindowF
            position={{
              lat: selectedSite.location.latitude,
              lng: selectedSite.location.longitude,
            }}
          >
            <div className="flex flex-col gap-3 m-2">
              <span className="text-black font-semibold text-lg">
                {capitalizeWords(selectedSite.listingName)}
              </span>
              <span>Parking Slots: {selectedSite.numSlots}</span>
              <span>Cost per hour: ₹{selectedSite.pricePerHour}</span>
              <Link href={selectedSite.gmapUrl} target="_blank">
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
