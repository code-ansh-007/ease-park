import { VT323 } from "next/font/google";
import SmallCard from "./SmallCard";
import { useState } from "react";
import BookSlot from "./BookSlot";
import useModalState from "@/zustand/store";
import { Poppins } from "next/font/google";
import { BiSolidCar } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa6";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });
const pop = Poppins({ subsets: ["latin"], weight: ["600"] });
function HomeParkingList({ sites, location }) {
  const [vehicleType, setVehicleType] = useState("car");

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

  const updateSitesWithDistances = () => {
    const updatedSites = sites.map((site) => {
      const distance = calculateDistance(
        location.coordinates.lat,
        location.coordinates.lng,
        site.location.latitude,
        site.location.longitude
      );

      return { ...site, distance };
    });
    updatedSites.sort((a, b) => a.distance - b.distance);

    return updatedSites;
  };

  const updatedSites = updateSitesWithDistances();

  const [showNext, setShowNext] = useState(false);
  const { setSiteDetails } = useModalState();

  return (
    <main className={`bg-[#161B24]  ${pop.className} pt-3`}>
      <div className=" h-full bg-[#1c2331] rounded-t-3xl px-4 pb-5">
        {!showNext && (
          <div className="flex justify-evenly pt-4 text-white ">
            <button
              onClick={() => setVehicleType("car")}
              className={`${
                vehicleType === "car"
                  ? "bg-[#313b30] text-white"
                  : "bg-[#319a3c]"
              } flex flex-col justify-center items-center  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid text-xs`}
            >
              <BiSolidCar size={"28px"} /> Car
            </button>
            <button
              onClick={() => setVehicleType("bike")}
              className={`${
                vehicleType === "bike"
                  ? "bg-[#313b30] text-white"
                  : "bg-[#319a3c]"
              } flex flex-col justify-center items-center   h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid text-xs`}
            >
              <FaMotorcycle size={"28px"} /> Bike
            </button>
          </div>
        )}
        {/* <div className="flex justify-center items-center pt-4 pb-32"></div>
        <div className="pt-24"></div> */}
        {!showNext ? (
          <div className={` pt-4 grid grid-cols-2 gap-5  ${pop.className}`}>
            {updatedSites.map((site, index) => (
              <div
                onClick={() => {
                  site.vehicleType = vehicleType;
                  setSiteDetails(site);
                  setShowNext(true);
                }}
              >
                <SmallCard key={index} site={site} />
              </div>
            ))}
          </div>
        ) : (
          <BookSlot />
        )}
      </div>
    </main>
  );
}
export default HomeParkingList;
