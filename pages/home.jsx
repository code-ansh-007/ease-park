import { VT323 } from 'next/font/google';
import TopBar from '@/components/TopBar';
import SearchBar from '@/components/SearchBar';
import BottomBar from '@/components/BottomBar';
import HomeParkingList from '@/components/HomeParkingList';
import ParkingCard from '@/components/Parkingcard';



const vt = VT323({ subsets: ['latin'], weight: ["400"], });

export default function MainHome() {
  return (
    <main className={`bg-[#161B24]  h-screen ${vt.className} `}>
      <TopBar/>
      <SearchBar/>
      {/* mapbox */}
      {/* <ParkingCard/> */}
      <div className=' w-full h-2/5 -mt- bg-[#161B24]'></div> 
      <HomeParkingList/>
      <BottomBar/>

    </main>
  );
}
