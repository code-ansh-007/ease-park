import { VT323 } from "next/font/google";
import SmallCard from "./SmallCard";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });
function HomeParkingList({ sites }) {
  return (
    <main className={`bg-[#161B24]  ${vt.className} pt-3`}>
      <div className=" h-full bg-[#1c2331] rounded-t-3xl px-4">
        <div className="flex justify-evenly pt-4 text-white">
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            <img src="car.svg" alt="" /> Car
          </button>
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            <img src="Bike.png" alt="" /> Bike
          </button>
        </div>
        {/* <div className="flex justify-center items-center pt-4 pb-32"></div>
        <div className="pt-24"></div> */}
        <div className="grid grid-cols-2 gap-5">
          {sites.map((site, index) => (
            <SmallCard key={index} site={site} />
          ))}
        </div>
      </div>
    </main>
  );
}
export default HomeParkingList;
