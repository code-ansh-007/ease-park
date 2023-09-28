import { Poppins } from "next/font/google";
import { BiSolidHomeAlt2 } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";

const pop = Poppins({ subsets: ["latin"], weight: ["400"] });
function BottomBar(props) {
   return (
      <main className={`bg-[#161B24]  ${pop.className}  sticky bottom-0 w-full text-white `}>
         <div className=' h-20 bg-[#319A3C] rounded-t-3xl'>
        <div className='flex justify-evenly items-center h-full pt-3'>
            <button className='flex flex-col justify-center items-center text-xs leading-none'>
                <BiSolidHomeAlt2 size={"24px"}/>
                <h1 className='pt-1'>Home</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xs leading-none'>
                <AiFillClockCircle size={"24px"} />
                <h1 className='pt-1'>Session</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xs leading-none'>
                <FaLocationDot size={"24px"}/>
                <h1 className='pt-1'>Location</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xs leading-none'>
                <FaHistory size={"24px"}  />
                <h1 className='pt-1'>History</h1>
            </button>
        </div>
      </div>

      </main>        
   )
}
export default BottomBar