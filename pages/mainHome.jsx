import { VT323 } from "next/font/google";
import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import BottomBar from "@/components/BottomBar";
import HomeParkingList from "@/components/HomeParkingList";
import MapBox from "@/components/MapBox";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { getSession } from "next-auth/react";
import useGeoLocation from "@/hooks/useGeoLocation";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });

export default function MainHome({ sites }) {
  const location = useGeoLocation();
  return (
    <main className={`bg-[#161B24]  h-full ${vt.className} relative `}>
      <TopBar />
      {/* mapbox */}
      <MapBox sites={sites} />
      {/* <ParkingCard/> */}
      <div className=" w-full h-2/5 -mt- bg-[#161B24]"></div>
      <HomeParkingList sites={sites} location={location} />

      <BottomBar />
    </main>
  );
}

export async function getServerSideProps() {
  const session = getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let sites = [];
  const q = query(collection(db, "listings"));

  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    const siteData = doc.data();
    if (siteData.timeStamp && siteData.timeStamp.seconds) {
      const serverTimestamp = new Date(siteData.timeStamp.seconds * 1000);
      siteData.timeStamp = serverTimestamp.toDateString();
    }
    sites.push(siteData);
  });

  return {
    props: {
      sites,
    },
  };
}
