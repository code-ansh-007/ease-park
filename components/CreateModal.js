import { db } from "@/firebase";
import useModalState from "@/zustand/store";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const CreateModal = () => {
  const { closeModal } = useModalState();
  const { data: session } = useSession();

  // ? form states

  const [listingName, setListingName] = useState("");
  const [price, setPrice] = useState(""); // ? this is price per hour
  const [location, setLocation] = useState({
    lat: 0.0,
    lng: 0.0,
  });
  const [numSlots, setNumSlots] = useState(3);
  const [gmapUrl, setGmapUrl] = useState("");

  const handleClose = (e) => {
    if (
      e.target.className ===
      "flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed top-0"
    )
      closeModal();
    else return;
  };

  // const geoLocation = useGeoLocation();
  // useEffect(() => {
  //   if (geoLocation)
  //     setLocation({
  //       lat: geoLocation.coordinates.lat,
  //       lng: geoLocation.coordinates.lng,
  //     });
  // }, [geoLocation]);

  const validateInputs = () => {}; // ? to be implemented further in the build

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "listings"), {
        ownerId: session?.user?.id,
        listingName,
        pricePerHour: price,
        location: extractCoordinatesFromUrl(gmapUrl),
        numSlots,
        gmapUrl,
        timeStamp: serverTimestamp(),
      });
      alert("Successfully added the listing");
      closeModal();
    } catch (error) {
      alert("Provide valid location URL");
    }
  };

  const extractCoordinatesFromUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
    const match = url.match(regex);

    if (match && match.length === 3) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);

      return { latitude, longitude };
    }
    return null;
  };

  console.log(
    extractCoordinatesFromUrl(
      "https://www.google.com/maps/place/LPU+FRONT+ENTRANCE+GATE/@31.2738031,75.6640186,14z/data=!4m10!1m2!2m1!1slpu+main+gate!3m6!1s0x391a5fca6a8887f9:0x48044ce5b6683280!8m2!3d31.2607955!4d75.7069368!15sCg1scHUgbWFpbiBnYXRlIgOIAQGSAQp1bml2ZXJzaXR54AEA!16s%2Fg%2F11t6wp94qk?entry=ttu"
    )
  );

  return (
    <main
      onClick={handleClose}
      className="flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed top-0"
    >
      <div className="bg-white p-2 rounded-xl flex flex-col items-start gap-3 w-[300px]">
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-xl">Enter parking lot details</span>
          <AiFillCloseCircle onClick={closeModal} size={28} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-5"
        >
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="listingName" className="font-bold">
              Listing Name
            </label>
            <input
              id="listingName"
              required
              type="text"
              value={listingName}
              onChange={(e) => setListingName(e.target.value)}
              placeholder="e.g. Vane Hart Parkings"
              className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="price" className="font-bold">
              Pricing/hr
            </label>
            <input
              id="price"
              required
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. ₹50"
              className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none w-full"
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <span className="font-bold">Google maps location</span>
            <input
              id="numslots"
              type="text"
              value={gmapUrl}
              required
              onChange={(e) => setGmapUrl(e.target.value)}
              placeholder="https://....."
              className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="numslots" className="font-bold">
              Number of slots(3 is minimum and 500 is maximum)
            </label>
            <input
              id="numslots"
              type="number"
              required
              min={3}
              max={500}
              value={numSlots}
              onChange={(e) => setNumSlots(e.target.value)}
              className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none w-full"
            />
          </div>
          <button className="bg-blue-500 p-1 text-white rounded-xl px-4 active:scale-110 transition transform duration-300">
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateModal;
