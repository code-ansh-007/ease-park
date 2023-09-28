import { VT323 } from "next/font/google";
import ParkingCard from "./Parkingcard";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });
function HomeParkingList(props) {
  return (
    <main className={`bg-[#161B24]  ${vt.className} pt-3`}>
      <div className=" h-full bg-[#1c2331] rounded-t-3xl">
        <div className="flex justify-evenly pt-4 text-white">
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            {" "}
            <img src="car.svg" alt="" /> Car
          </button>
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            {" "}
            <img src="Bike.png" alt="" /> Bike
          </button>
        </div>
        <div className="flex justify-center items-center pt-4 pb-32"></div>
        <div className="pt-24"></div>
      </div>
    </main>
  );
}
export default HomeParkingList;
