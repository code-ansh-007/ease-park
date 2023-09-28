import React from "react";

const SmallCard = ({ site }) => {
  return (
    <main className="flex flex-col gap-3 bg-[#415740] p-2 rounded-2xl">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-xl">{site.listingName}</span>
        <span className="font-bold text-green-700">₹{site.pricePerHour}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white">
          {Math.round(site.distance * 100) / 100}KM
        </span>
        <span className="text-white">Slots: {site.numSlots}</span>
      </div>
    </main>
  );
};

export default SmallCard;
