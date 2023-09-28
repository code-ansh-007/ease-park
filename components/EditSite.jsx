import { db } from "@/firebase";
import useModalState from "@/zustand/store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const EditSite = () => {
  const { closeEdit, editObject } = useModalState();
  const handleClose = (e) => {
    if (
      e.target.className ===
      "flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed left-0 top-0"
    )
      closeModal();
    else return;
  };

  const [listingName, setListingName] = useState("");
  const [price, setPrice] = useState(""); // ? this is price per hour
  const [location, setLocation] = useState({
    lat: 0.0,
    lng: 0.0,
  });
  const [numSlots, setNumSlots] = useState(3);
  const [gmapUrl, setGmapUrl] = useState("");

  useState(() => {
    setListingName(editObject.listingName);
    setPrice(editObject.pricePerHour);
    setNumSlots(editObject.numSlots);
    setGmapUrl(editObject.gmapUrl);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = editObject.id;
      await updateDoc(doc(db, "listings", id), {
        listingName,
        price,
        numSlots,
        gmapUrl,
      });
      alert("successfully updated the document");
    } catch (err) {
      alert("Document not updated");
    }
  };

  return (
    <main
      onClick={handleClose}
      className="flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed left-0 top-0"
    >
      <div className="bg-white p-2 rounded-xl flex flex-col items-start gap-3 w-[300px]">
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-xl">Edit parking lot details</span>
          <AiFillCloseCircle onClick={closeEdit} size={28} />
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
            Update
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditSite;
