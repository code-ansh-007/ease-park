import useModalState from "@/zustand/store";
import React, { useState } from "react";

const BookSlot = () => {
  const { siteDetails } = useModalState();
  const [totalPrice, setTotalPrice] = useState(siteDetails.pricePerHour);
  const [selectedDuration, setSelectedDuration] = useState(30);

  return (
    <div className=" flex flex-col gap-6 pt-8 pb-5">
      <button className="flex flex-col justify-center items-center bg-[#2e713454]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
        <img src="car.svg" alt="" /> Car
      </button>
      <div className="flex items-center justify-between bg-[#2e713454] rounded-2xl p-2 text-white">
        <div className="flex flex-col gap-3">
          <span className="text-xl font-semibolod">
            {siteDetails.listingName}
          </span>
          <span>{Math.round(siteDetails.distance * 100) / 100}KM</span>
        </div>
        <span className="text-green-500">
          Rs. {siteDetails.pricePerHour}/hr
        </span>
      </div>
      {/* select timing block */}

      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl text-white ">Select Time</span>
        <div className="flex gap-2">
          <span
            onClick={() => setTotalPrice(siteDetails.pricePerHour / 2)}
            className="bg-[#415740] border-[1px] border-green-400 px-3 rounded-2xl p-1"
          >
            30 min
          </span>
          <span
            onClick={() => setTotalPrice(siteDetails.pricePerHour)}
            className="bg-[#415740] border-[1px] border-green-400 px-3 rounded-2xl p-1"
          >
            1 hr
          </span>
          <span
            onClick={() => setTotalPrice(siteDetails.pricePerHour * 2)}
            className="bg-[#415740] border-[1px] border-green-400 px-3 rounded-2xl p-1"
          >
            2 hr
          </span>
          <span
            onClick={() => setTotalPrice(siteDetails.pricePerHour * 24)}
            className="bg-[#415740] border-[1px] border-green-400 px-3 rounded-2xl p-1"
          >
            1 Day
          </span>
          <span
            onClick={() => setTotalPrice(siteDetails.pricePerHour * 24 * 7)}
            className="bg-[#415740] border-[1px] border-green-400 px-3 rounded-2xl p-1"
          >
            1 Week
          </span>
        </div>

        {/* Total price div */}

        <div className="flex gap-1 ">
          <span className="text-green-500 font-semibold">Total:</span>
          <span className="text-white">₹{totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default BookSlot;
