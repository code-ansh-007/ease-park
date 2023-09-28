import React from "react";
import { FaWalking } from 'react-icons/fa';

const SmallCard = ({ site }) => {
  return (
    <main className="flex flex-col gap-3 bg-[#415740] p-2 rounded-2xl ">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-xs">{site.listingName}</span>
        <span className="font-bold text-[#00ff1b] text-xs">₹{site.pricePerHour}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white text-xs flex"><FaWalking/>
          {Math.round(site.distance * 100) / 100}KM
        </span>
        <span className="text-white text-xs">Slots: {site.numSlots}</span>
      </div>
    </main>
  );
};

export default SmallCard;
