import { VT323 } from 'next/font/google';

const vt = VT323({ subsets: ['latin'], weight: ["400"], });
function ParkingCard(props) {
   return (
      <main className={`bg-[#161B24]  ${vt.className} `}>
        <button className='flex flex-col justify-center items-center bg-[#319a3c54] px-10 py-12 rounded-xl '> 
        <div>
            <div>
                <h1>Location 1</h1>
                <h2>Rs.10</h2>
            </div>
            <div>
                <img src="" alt="" />
                <h2>1.5 Km Away</h2>
                <h2>10 Slots</h2>
            </div>
        </div>

        </button>
      </main>        
   )
}
export default ParkingCard