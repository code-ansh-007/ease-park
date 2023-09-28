import React, { useState, useEffect } from "react";
import axios from "axios";

function Geocoder({ googleMapsUrl }) {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const extractLocationFromUrl = (url) => {
      const parts = url.split("@");
      const lastPart = parts[parts.length - 1];

      const locationParts = lastPart.split("/");

      const location = locationParts[0].split("?")[0];

      return decodeURIComponent(location).replace(/\+/g, " ");
    };

    const location = extractLocationFromUrl(googleMapsUrl);

    const apiKey = "8b30eeeacfb94fcd8e9e423e6ee9633f";

    // Encode the location
    const encodedLocation = encodeURIComponent(location);

    // Construct the API endpoint URL
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`;

    // Make the API request
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.results && data.results.length > 0) {
          // Extract the coordinates (latitude and longitude)
          const result = data.results[0];
          const { lat, lng } = result.geometry;
          setCoordinates({ latitude: lat, longitude: lng });
        } else {
          setError("No results found.");
        }
      })
      .catch((error) => {
        setError("Error fetching data from the OpenCage API.");
      });
  }, [googleMapsUrl]);

  return (
    <div>
      {coordinates ? (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      ) : (
        <p>{error || "Fetching coordinates..."}</p>
      )}
    </div>
  );
}

export default Geocoder;
