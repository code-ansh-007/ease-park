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
import SearchBar from "./SearchBar";
// import Geocoder from "./Geocoder.js";
// import { Geocoder } from "./Geocoder";

const containerStyle = {
  width: "100vw",
  height: "60vh",
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

  // ? DISTANCE CALCULATION FUNCTION

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const deg2rad = (deg) => deg * (Math.PI / 180);
    const lat1Rad = deg2rad(lat1);
    const lon1Rad = deg2rad(lon1);
    const lat2Rad = deg2rad(lat2);
    const lon2Rad = deg2rad(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  return isLoaded ? (

    <div className="flex flex-col items-start gap-3  ">
      <div className=" z-20 w-full bg-transparent">
    <SearchBar value={city} setterFunction={setCity} onSubmit={searchLocation}/>
    </div>
      <div className="bg-black -mt-16 z-10" >
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
    </div>
  ) : null;
}

export default React.memo(MapBox);
