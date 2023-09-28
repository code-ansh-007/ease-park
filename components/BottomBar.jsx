import { VT323 } from 'next/font/google';

const vt = VT323({ subsets: ['latin'], weight: ["400"], });
function BottomBar(props) {
   return (
      <main className={`bg-[#161B24]  ${vt.className}  sticky bottom-0 w-full`}>
         <div className=' h-20 bg-[#319A3C] rounded-t-3xl'>
        <div className='flex justify-evenly items-center h-full pt-3'>
            <button className='flex flex-col justify-center items-center text-xl leading-none'>
                <img src="Home.svg" alt="" width={'26px'} />
                <h1 className='pt-1'>Home</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xl leading-none'>
                <img src="Session.svg" alt="" />
                <h1>Session</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xl leading-none'>
                <img src="Location.svg" alt="" />
                <h1>Location</h1>
            </button>
            <button className='flex flex-col justify-center items-center text-xl leading-none'>
                <img src="History.svg" alt=""  />
                <h1>History</h1>
            </button>
        </div>
      </div>

      </main>        
   )
}
export default BottomBar