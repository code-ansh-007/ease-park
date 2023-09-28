import { VT323 } from 'next/font/google';

const vt = VT323({ subsets: ['latin'], weight: ["400"], });
function TopBar(props) {
   return (
      <main className={`bg-[#161B24]  ${vt.className} bg-transparent z-20 `}>
         <div className=' h-[72px] bg-[#319A3C]  z-20'>
        <div className='flex justify-evenly items-center h-full pt-3'>
          <img src="Menu.svg" alt="" />
          <h1 className='text-3xl text-white '>Ease<span className='text-[#5EE65A]  '>Park</span></h1>
          <img src="user.svg" alt="" />
        </div>
      </div>

      </main>        
   )
}
export default TopBar